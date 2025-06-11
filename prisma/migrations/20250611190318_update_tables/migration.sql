/*
  Warnings:

  - You are about to drop the `crop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `farm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `harvest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `producer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "farm" DROP CONSTRAINT "farm_producer_id_fkey";

-- DropForeignKey
ALTER TABLE "farm_culture" DROP CONSTRAINT "farm_culture_crop_id_fkey";

-- DropForeignKey
ALTER TABLE "farm_culture" DROP CONSTRAINT "farm_culture_farm_id_fkey";

-- DropForeignKey
ALTER TABLE "farm_culture" DROP CONSTRAINT "farm_culture_harvest_id_fkey";

-- DropTable
DROP TABLE "crop";

-- DropTable
DROP TABLE "farm";

-- DropTable
DROP TABLE "harvest";

-- DropTable
DROP TABLE "producer";

-- CreateTable
CREATE TABLE "producers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "producers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "farms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "total_area_in_hectares" DOUBLE PRECISION NOT NULL,
    "agriculture_area_in_hectares" DOUBLE PRECISION NOT NULL,
    "vegetation_area_in_hectares" DOUBLE PRECISION NOT NULL,
    "producer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "farms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crops" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "harvests" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "harvests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "producers_document_key" ON "producers"("document");

-- AddForeignKey
ALTER TABLE "farms" ADD CONSTRAINT "farms_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "farm_culture" ADD CONSTRAINT "farm_culture_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "farm_culture" ADD CONSTRAINT "farm_culture_crop_id_fkey" FOREIGN KEY ("crop_id") REFERENCES "crops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "farm_culture" ADD CONSTRAINT "farm_culture_harvest_id_fkey" FOREIGN KEY ("harvest_id") REFERENCES "harvests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
