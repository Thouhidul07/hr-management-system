const { prisma } = require('../config/db');

const generateEmployeeId = () => {
  return `EMP${Date.now()}`;
};

const getAllEmployees = async (filters = {}) => {
  const { page = 1, limit = 10, search = '', department, status } = filters;
  const skip = (page - 1) * limit;
  
  const where = {
    ...(search && {
      OR: [
        { user: { firstName: { contains: search, mode: 'insensitive' } } },
        { user: { lastName: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
        { employeeId: { contains: search, mode: 'insensitive' } }
      ]
    }),
    ...(department && { user: { departmentId: parseInt(department) } }),
    ...(status && { user: { status } })
  };
  
  const [employees, total] = await Promise.all([
    prisma.employee.findMany({
      where,
      skip,
      take: limit,
      include: {
        user: {
          include: {
            department: true
          }
        },
        reportingManager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    }),
    prisma.employee.count({ where })
  ]);
  
  return {
    employees,
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / limit)
  };
};

const getEmployeeById = async (id) => {
  const employee = await prisma.employee.findUnique({
    where: { id: parseInt(id) },
    include: {
      user: {
        include: {
          department: true
        }
      },
      reportingManager: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      },
      attendances: {
        take: 10,
        orderBy: {
          date: 'desc'
        }
      },
      leaveRequests: {
        take: 5,
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  });
  
  if (!employee) {
    throw new Error('Employee not found');
  }
  
  return employee;
};

const createEmployee = async (employeeData) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    departmentId,
    position,
    hireDate,
    reportingManagerId,
    jobTitle,
    salary,
    bankAccountNumber,
    taxId,
    emergencyContactName,
    emergencyContactPhone,
    emergencyContactRelation
  } = employeeData;
  
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });
  
  if (existingUser) {
    throw new Error('User already exists with this email');
  }
  
  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: password, // In production, hash this password
      firstName,
      lastName,
      role,
      departmentId: departmentId ? parseInt(departmentId) : null,
      position,
      hireDate: hireDate ? new Date(hireDate) : null,
      status: 'ACTIVE'
    }
  });
  
  // Create employee
  const employee = await prisma.employee.create({
    data: {
      userId: user.id,
      employeeId: generateEmployeeId(),
      reportingManagerId: reportingManagerId ? parseInt(reportingManagerId) : null,
      jobTitle,
      salary: salary ? parseFloat(salary) : null,
      bankAccountNumber,
      taxId,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelation
    },
    include: {
      user: {
        include: {
          department: true
        }
      }
    }
  });
  
  return employee;
};

const updateEmployee = async (id, updateData) => {
  const {
    firstName,
    lastName,
    email,
    role,
    departmentId,
    position,
    hireDate,
    reportingManagerId,
    jobTitle,
    salary,
    bankAccountNumber,
    taxId,
    emergencyContactName,
    emergencyContactPhone,
    emergencyContactRelation
  } = updateData;
  
  // Check if employee exists
  const existingEmployee = await prisma.employee.findUnique({
    where: { id: parseInt(id) }
  });
  
  if (!existingEmployee) {
    throw new Error('Employee not found');
  }
  
  // Check if email is being changed and already exists
  if (email && email !== existingEmployee.user.email) {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      throw new Error('User already exists with this email');
    }
  }
  
  // Update user
  const user = await prisma.user.update({
    where: { id: existingEmployee.userId },
    data: {
      ...(email && { email }),
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(role && { role }),
      ...(departmentId && { departmentId: parseInt(departmentId) }),
      ...(position && { position }),
      ...(hireDate && { hireDate: new Date(hireDate) })
    },
    include: {
      department: true
    }
  });
  
  // Update employee
  const employee = await prisma.employee.update({
    where: { id: parseInt(id) },
    data: {
      ...(reportingManagerId && { reportingManagerId: parseInt(reportingManagerId) }),
      ...(jobTitle && { jobTitle }),
      ...(salary && { salary: parseFloat(salary) }),
      ...(bankAccountNumber && { bankAccountNumber }),
      ...(taxId && { taxId }),
      ...(emergencyContactName && { emergencyContactName }),
      ...(emergencyContactPhone && { emergencyContactPhone }),
      ...(emergencyContactRelation && { emergencyContactRelation })
    },
    include: {
      user: {
        include: {
          department: true
        }
      }
    }
  });
  
  return employee;
};

const deleteEmployee = async (id) => {
  // Check if employee exists
  const existingEmployee = await prisma.employee.findUnique({
    where: { id: parseInt(id) }
  });
  
  if (!existingEmployee) {
    throw new Error('Employee not found');
  }
  
  // Delete employee record
  await prisma.employee.delete({
    where: { id: parseInt(id) }
  });
  
  // Delete user record
  await prisma.user.delete({
    where: { id: existingEmployee.userId }
  });
  
  return { message: 'Employee deleted successfully' };
};

const getEmployeeStats = async () => {
  const [totalEmployees, activeEmployees, departmentStats] = await Promise.all([
    prisma.employee.count(),
    prisma.user.count({ where: { status: 'ACTIVE' } }),
    prisma.department.findMany({
      include: {
        _count: {
          select: { users: true }
        }
      }
    })
  ]);
  
  return {
    totalEmployees,
    activeEmployees,
    departmentStats
  };
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats
};