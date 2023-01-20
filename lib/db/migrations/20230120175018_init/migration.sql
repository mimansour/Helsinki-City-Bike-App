-- CreateTable
CREATE TABLE "Station" (
    "fid" INTEGER NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "x" REAL NOT NULL,
    "y" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Journey" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "departureDate" DATETIME NOT NULL,
    "returnDate" DATETIME NOT NULL,
    "departureStationId" TEXT NOT NULL,
    "departureStationName" TEXT NOT NULL,
    "returnStationId" TEXT NOT NULL,
    "returnStationName" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "distance" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Station_stationId_key" ON "Station"("stationId");
