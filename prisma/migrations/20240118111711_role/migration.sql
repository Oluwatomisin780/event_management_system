/*
  Warnings:

  - You are about to drop the column `userType` on the `User` table. All the data in the column will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ORGANIZER', 'PARTICIPANT');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userType",
ADD COLUMN     "role" "Role" NOT NULL;

-- DropEnum
DROP TYPE "UserType";
