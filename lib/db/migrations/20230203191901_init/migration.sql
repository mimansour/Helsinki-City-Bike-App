-- CreateTable
CREATE TABLE "Station" (
    "fid" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "stationId" TEXT NOT NULL,
    "nameFi" TEXT NOT NULL,
    "nameSv" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "addressFi" TEXT NOT NULL,
    "addressSv" TEXT NOT NULL,
    "cityFi" TEXT NOT NULL,
    "citySv" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journey" (
    "id" SERIAL NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3) NOT NULL,
    "departureStationId" TEXT NOT NULL,
    "departureStationName" TEXT NOT NULL,
    "returnStationId" TEXT NOT NULL,
    "returnStationName" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Journey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Station_stationId_key" ON "Station"("stationId");
