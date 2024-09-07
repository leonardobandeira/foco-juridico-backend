-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Indicador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "chaveDeBusca" TEXT NOT NULL DEFAULT '',
    "tipoIndicadorId" INTEGER NOT NULL,
    "painelId" INTEGER NOT NULL,
    CONSTRAINT "Indicador_tipoIndicadorId_fkey" FOREIGN KEY ("tipoIndicadorId") REFERENCES "TipoIndicador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Indicador_painelId_fkey" FOREIGN KEY ("painelId") REFERENCES "Painel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Indicador" ("id", "nome", "painelId", "tipoIndicadorId") SELECT "id", "nome", "painelId", "tipoIndicadorId" FROM "Indicador";
DROP TABLE "Indicador";
ALTER TABLE "new_Indicador" RENAME TO "Indicador";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
