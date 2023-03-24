-- DropForeignKey
ALTER TABLE "Empresa" DROP CONSTRAINT "Empresa_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Local" DROP CONSTRAINT "Local_empresaId_fkey";

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Local" ADD CONSTRAINT "Local_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
