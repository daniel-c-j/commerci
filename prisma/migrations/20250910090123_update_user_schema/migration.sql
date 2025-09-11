/*
  Warnings:

  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "numReviews" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "role" SET NOT NULL;
