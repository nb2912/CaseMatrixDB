const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
	console.log('Seeding database...');

	// Users
	const user = await prisma.user.upsert({
		where: { email: 'user@example.com' },
		update: {},
		create: {
			email: 'user@example.com',
			passwordHash: 'password',
			role: 'user',
		},
	});

	const lawyer = await prisma.user.upsert({
		where: { email: 'lawyer@example.com' },
		update: {},
		create: {
			email: 'lawyer@example.com',
			passwordHash: 'password',
			role: 'lawyer',
			specialization: 'civil',
		},
	});

	const judge = await prisma.user.upsert({
		where: { email: 'judge@example.com' },
		update: {},
		create: {
			email: 'judge@example.com',
			passwordHash: 'password',
			role: 'judge',
		},
	});

	// Cases
	const caseA = await prisma.case.create({
		data: {
			title: 'Smith vs Johnson',
			status: 'Open',
			date: new Date(),
			description: 'Dispute regarding contract termination.',
			user: { connect: { id: user.id } },
			lawyer: { connect: { id: lawyer.id } },
		},
	});

	const caseB = await prisma.case.create({
		data: {
			title: 'State vs Brown',
			status: 'In Progress',
			date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
			description: 'Criminal case under investigation.',
			user: { connect: { id: user.id } },
		},
	});

	// Evidence
	await prisma.evidence.createMany({
		data: [
			{
				caseId: caseA.id,
				name: 'Contract Document',
				type: 'Document',
				uploaded: new Date(),
			},
			{
				caseId: caseA.id,
				name: 'Email Correspondence',
				type: 'Document',
				uploaded: new Date(),
			},
			{
				caseId: caseB.id,
				name: 'Security Footage',
				type: 'Video',
				uploaded: new Date(),
			},
		],
	});

	// Witnesses
	await prisma.witness.createMany({
		data: [
			{ caseId: caseA.id, name: 'Alice Green', statement: 'Was present during signing.' },
			{ caseId: caseB.id, name: 'Bob White', statement: 'Heard loud noises near the scene.' },
		],
	});

	console.log('Seeding completed.');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});


