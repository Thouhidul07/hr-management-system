const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create departments
  const departments = await Promise.all([
    prisma.department.create({
      data: {
        name: 'Human Resources',
        description: 'Handles all HR-related functions'
      }
    }),
    prisma.department.create({
      data: {
        name: 'Engineering',
        description: 'Software development and technical support'
      }
    }),
    prisma.department.create({
      data: {
        name: 'Marketing',
        description: 'Marketing and sales activities'
      }
    }),
    prisma.department.create({
      data: {
        name: 'Finance',
        description: 'Financial planning and accounting'
      }
    })
  ]);

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@hrms.com',
      passwordHash: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN'
    }
  });

  const hrUser = await prisma.user.create({
    data: {
      email: 'hr@hrms.com',
      passwordHash: hashedPassword,
      firstName: 'HR',
      lastName: 'Manager',
      role: 'HR',
      departmentId: departments[0].id
    }
  });

  const managerUser = await prisma.user.create({
    data: {
      email: 'manager@hrms.com',
      passwordHash: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'MANAGER',
      departmentId: departments[1].id
    }
  });

  const employeeUser = await prisma.user.create({
    data: {
      email: 'employee@hrms.com',
      passwordHash: hashedPassword,
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'EMPLOYEE',
      departmentId: departments[1].id
    }
  });

  // Create employees
  const adminEmployee = await prisma.employee.create({
    data: {
      userId: adminUser.id,
      employeeId: 'EMP001',
      jobTitle: 'System Administrator',
      salary: 80000
    }
  });

  const hrEmployee = await prisma.employee.create({
    data: {
      userId: hrUser.id,
      employeeId: 'EMP002',
      jobTitle: 'HR Manager',
      salary: 75000,
      reportingManagerId: adminUser.id
    }
  });

  const managerEmployee = await prisma.employee.create({
    data: {
      userId: managerUser.id,
      employeeId: 'EMP003',
      jobTitle: 'Engineering Manager',
      salary: 90000,
      reportingManagerId: adminUser.id
    }
  });

  const employee = await prisma.employee.create({
    data: {
      userId: employeeUser.id,
      employeeId: 'EMP004',
      jobTitle: 'Software Developer',
      salary: 60000,
      reportingManagerId: managerUser.id
    }
  });

  // Create onboarding tasks
  const onboardingTasks = await Promise.all([
    prisma.onboardingTask.create({
      data: {
        title: 'Complete HR Documentation',
        description: 'Fill out all necessary HR paperwork',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        assignedTo: employeeUser.id
      }
    }),
    prisma.onboardingTask.create({
      data: {
        title: 'Setup Workstation',
        description: 'Configure computer and software tools',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        assignedTo: employeeUser.id
      }
    }),
    prisma.onboardingTask.create({
      data: {
        title: 'Team Introduction',
        description: 'Meet with team members and introduce yourself',
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        assignedTo: employeeUser.id
      }
    })
  ]);

  // Create attendance records
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const attendanceRecords = await Promise.all([
    prisma.attendance.create({
      data: {
        employeeId: employee.id,
        date: today,
        checkIn: new Date(today.setHours(9, 0, 0, 0)),
        checkOut: new Date(today.setHours(17, 30, 0, 0)),
        status: 'PRESENT'
      }
    }),
    prisma.attendance.create({
      data: {
        employeeId: employee.id,
        date: yesterday,
        checkIn: new Date(yesterday.setHours(9, 15, 0, 0)),
        checkOut: new Date(yesterday.setHours(17, 0, 0, 0)),
        status: 'LATE'
      }
    })
  ]);

  // Create offboarding process
  const offboardingProcess = await prisma.offboardingProcess.create({
    data: {
      employeeId: employee.id,
      lastDay: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      reason: 'Resignation',
      status: 'active'
    }
  });

  console.log('Database seeded successfully!');
  console.log('Created users:');
  console.log(`- Admin: admin@hrms.com / password123`);
  console.log(`- HR: hr@hrms.com / password123`);
  console.log(`- Manager: manager@hrms.com / password123`);
  console.log(`- Employee: employee@hrms.com / password123`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });