import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { destinations } from "../src/lib/data";

const db = new PrismaClient();
async function main() {
  const adminPassword = process.env.ADMIN_DEMO_PASSWORD;
  if (adminPassword) {
    if (adminPassword.length < 16 || /replace|provide|example/i.test(adminPassword)) throw new Error("Set a unique ADMIN_DEMO_PASSWORD of at least 16 characters; placeholder values are not accepted.");
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await db.user.upsert({ where: { email: "admin@travexa.local" }, update: { passwordHash, role: Role.ADMIN }, create: { email: "admin@travexa.local", name: "TRAVEXA Admin", passwordHash, role: Role.ADMIN } });
  } else if (process.env.NODE_ENV === "production") throw new Error("Set ADMIN_DEMO_PASSWORD to provision the initial administrator.");
  const categories = [...new Set(destinations.flatMap((item) => item.characteristics))];
  for (const name of categories) await db.category.upsert({ where: { name }, update: {}, create: { name } });
  for (const name of ["Winter", "Summer", "Monsoon", "Spring / Autumn"]) await db.season.upsert({ where: { name }, update: {}, create: { name } });
  for (const item of destinations) {
    const region = await db.region.upsert({ where: { name: item.region }, update: {}, create: { name: item.region } });
    const country = await db.country.upsert({ where: { name: item.country }, update: { regionId: region.id }, create: { name: item.country, regionId: region.id } });
    const categoryName = item.characteristics?.[0] ?? "Nature";
    const category = await db.category.upsert({ where: { name: categoryName }, update: {}, create: { name: categoryName } });
    const seasonName = item.seasons?.[0] ?? "Winter";
    const season = await db.season.upsert({ where: { name: seasonName }, update: {}, create: { name: seasonName } });
    const state = item.state ? await db.state.findFirst({ where: { name: item.state, countryId: country.id } }) ?? await db.state.create({ data: { name: item.state, countryId: country.id } }) : null;
    const destination = await db.destination.upsert({ where: { slug: item.slug }, update: { name: item.name, description: item.description, longDescription: item.longDescription, knownFor: item.knownFor ?? [item.tag], bestFor: item.characteristics, activities: item.thingsToDo ?? [], attractions: item.topAttractions ?? [], localFood: item.localFood ?? [], culture: item.cultureTips ?? [], experiences: item.hiddenGems ?? [], transport: item.routes ?? [], latitude: item.coordinates?.[0], longitude: item.coordinates?.[1], rating: Number(item.rating), countryId: country.id, regionId: region.id, stateId: state?.id, categoryId: category.id, seasonId: season.id, dailyBudget: item.dailyBudget, idealDuration: item.duration, approximateBudget: item.budget }, create: { slug: item.slug, name: item.name, description: item.description, longDescription: item.longDescription, knownFor: item.knownFor ?? [item.tag], bestFor: item.characteristics, activities: item.thingsToDo ?? [], attractions: item.topAttractions ?? [], localFood: item.localFood ?? [], culture: item.cultureTips ?? [], experiences: item.hiddenGems ?? [], transport: item.routes ?? [], latitude: item.coordinates?.[0], longitude: item.coordinates?.[1], rating: Number(item.rating), countryId: country.id, regionId: region.id, stateId: state?.id, categoryId: category.id, seasonId: season.id, dailyBudget: item.dailyBudget, idealDuration: item.duration, approximateBudget: item.budget } });
    await db.destinationImage.deleteMany({ where: { destinationId: destination.id } });
    await db.destinationImage.createMany({ data: [item.image, ...(item.gallery ?? [])].map((url, sortOrder) => ({ destinationId: destination.id, url, alt: `${item.name} destination photo ${sortOrder + 1}`, sortOrder })) });
  }
}
main().finally(() => db.$disconnect());
