/*
  Warnings:

  - Added the required column `simbolo` to the `TipoMeta` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TipoMeta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "simbolo" TEXT NOT NULL
);
INSERT INTO "new_TipoMeta" ("id", "nome") SELECT "id", "nome" FROM "TipoMeta";
DROP TABLE "TipoMeta";
ALTER TABLE "new_TipoMeta" RENAME TO "TipoMeta";
CREATE UNIQUE INDEX "TipoMeta_nome_key" ON "TipoMeta"("nome");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
