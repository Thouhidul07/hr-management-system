const { prisma } = require('../config/db');

const getAllOnboardingTasks = async (filters = {}) => {
  const { status, assignedTo, page = 1, limit = 10 } = filters;
  const skip = (page - 1) * limit;
  
  const where = {
    ...(status && { status }),
    ...(assignedTo && { assignedTo: parseInt(assignedTo) })
  };
  
  const [tasks, total] = await Promise.all([
    prisma.onboardingTask.findMany({
      where,
      skip,
      take: limit,
      include: {
        assignedUser: {
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
    prisma.onboardingTask.count({ where })
  ]);
  
  return {
    tasks,
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / limit)
  };
};

const getOnboardingTaskById = async (id) => {
  const task = await prisma.onboardingTask.findUnique({
    where: { id: parseInt(id) },
    include: {
      assignedUser: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      }
    }
  });
  
  if (!task) {
    throw new Error('Onboarding task not found');
  }
  
  return task;
};

const createOnboardingTask = async (taskData) => {
  const { title, description, dueDate, assignedTo } = taskData;
  
  const task = await prisma.onboardingTask.create({
    data: {
      title,
      description,
      dueDate: new Date(dueDate),
      assignedTo: assignedTo ? parseInt(assignedTo) : null
    },
    include: {
      assignedUser: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      }
    }
  });
  
  return task;
};

const updateOnboardingTask = async (id, updateData) => {
  const { title, description, dueDate, status, assignedTo } = updateData;
  
  const existingTask = await prisma.onboardingTask.findUnique({
    where: { id: parseInt(id) }
  });
  
  if (!existingTask) {
    throw new Error('Onboarding task not found');
  }
  
  const task = await prisma.onboardingTask.update({
    where: { id: parseInt(id) },
    data: {
      ...(title && { title }),
      ...(description && { description }),
      ...(dueDate && { dueDate: new Date(dueDate) }),
      ...(status && { status }),
      ...(assignedTo && { assignedTo: parseInt(assignedTo) })
    },
    include: {
      assignedUser: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      }
    }
  });
  
  return task;
};

const deleteOnboardingTask = async (id) => {
  const existingTask = await prisma.onboardingTask.findUnique({
    where: { id: parseInt(id) }
  });
  
  if (!existingTask) {
    throw new Error('Onboarding task not found');
  }
  
  await prisma.onboardingTask.delete({
    where: { id: parseInt(id) }
  });
  
  return { message: 'Onboarding task deleted successfully' };
};

const getOnboardingTasksByEmployee = async (employeeId) => {
  const tasks = await prisma.onboardingTask.findMany({
    where: { assignedTo: parseInt(employeeId) },
    include: {
      assignedUser: {
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
  });
  
  return tasks;
};

const getOnboardingStats = async () => {
  const [totalTasks, completedTasks, pendingTasks, assignedTasks] = await Promise.all([
    prisma.onboardingTask.count(),
    prisma.onboardingTask.count({ where: { status: 'completed' } }),
    prisma.onboardingTask.count({ where: { status: 'pending' } }),
    prisma.onboardingTask.count({ where: { assignedTo: { not: null } } })
  ]);
  
  return {
    totalTasks,
    completedTasks,
    pendingTasks,
    assignedTasks
  };
};

const getAllOffboardingProcesses = async (filters = {}) => {
  const { status, employeeId, page = 1, limit = 10 } = filters;
  const skip = (page - 1) * limit;
  
  const where = {
    ...(status && { status }),
    ...(employeeId && { employeeId: parseInt(employeeId) })
  };
  
  const [processes, total] = await Promise.all([
    prisma.offboardingProcess.findMany({
      where,
      skip,
      take: limit,
      include: {
        employee: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    }),
    prisma.offboardingProcess.count({ where })
  ]);
  
  return {
    processes,
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / limit)
  };
};

const getOffboardingProcessById = async (id) => {
  const process = await prisma.offboardingProcess.findUnique({
    where: { id: parseInt(id) },
    include: {
      employee: {
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      }
    }
  });
  
  if (!process) {
    throw new Error('Offboarding process not found');
  }
  
  return process;
};

const createOffboardingProcess = async (processData) => {
  const { employeeId, lastDay, reason } = processData;
  
  const process = await prisma.offboardingProcess.create({
    data: {
      employeeId: parseInt(employeeId),
      lastDay: new Date(lastDay),
      reason
    },
    include: {
      employee: {
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      }
    }
  });
  
  return process;
};

const updateOffboardingProcess = async (id, updateData) => {
  const { lastDay, reason, status } = updateData;
  
  const existingProcess = await prisma.offboardingProcess.findUnique({
    where: { id: parseInt(id) }
  });
  
  if (!existingProcess) {
    throw new Error('Offboarding process not found');
  }
  
  const process = await prisma.offboardingProcess.update({
    where: { id: parseInt(id) },
    data: {
      ...(lastDay && { lastDay: new Date(lastDay) }),
      ...(reason && { reason }),
      ...(status && { status })
    },
    include: {
      employee: {
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      }
    }
  });
  
  return process;
};

const deleteOffboardingProcess = async (id) => {
  const existingProcess = await prisma.offboardingProcess.findUnique({
    where: { id: parseInt(id) }
  });
  
  if (!existingProcess) {
    throw new Error('Offboarding process not found');
  }
  
  await prisma.offboardingProcess.delete({
    where: { id: parseInt(id) }
  });
  
  return { message: 'Offboarding process deleted successfully' };
};

module.exports = {
  getAllOnboardingTasks,
  getOnboardingTaskById,
  createOnboardingTask,
  updateOnboardingTask,
  deleteOnboardingTask,
  getOnboardingTasksByEmployee,
  getOnboardingStats,
  getAllOffboardingProcesses,
  getOffboardingProcessById,
  createOffboardingProcess,
  updateOffboardingProcess,
  deleteOffboardingProcess
};