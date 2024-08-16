/*
  Warnings:

  - Added the required column `valor` to the `Alerta` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alerta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "frequencia" INTEGER NOT NULL,
    "tipoMetaId" INTEGER NOT NULL,
    "indicadorId" INTEGER NOT NULL,
    CONSTRAINT "Alerta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Alerta_tipoMetaId_fkey" FOREIGN KEY ("tipoMetaId") REFERENCES "TipoMeta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Alerta_indicadorId_fkey" FOREIGN KEY ("indicadorId") REFERENCES "Indicador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Alerta" ("frequencia", "id", "indicadorId", "nome", "tipoMetaId", "usuarioId") SELECT "frequencia", "id", "indicadorId", "nome", "tipoMetaId", "usuarioId" FROM "Alerta";
DROP TABLE "Alerta";
ALTER TABLE "new_Alerta" RENAME TO "Alerta";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
