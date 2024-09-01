/*
  Warnings:

  - A unique constraint covering the columns `[message_id]` on the table `Read` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Read_message_id_key" ON "Read"("message_id");
