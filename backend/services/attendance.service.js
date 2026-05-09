const { prisma } = require('../config/db');

const getAllAttendanceRecords = async (filters = {}) => {
  const { 
    employeeId, 
    startDate, 
    endDate, 
    status, 
    page = 1, 
    limit = 10 
  } = filters;
  const skip = (page - 1) * limit;
  
  const where = {
    ...(employeeId && { employeeId: parseInt(employeeId) }),
    ...(startDate && endDate && {
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    }),
    ...(startDate && !endDate && {
      date: {
        gte: new Date(startDate)
      }
    }),
    ...(!startDate && endDate && {
      date: {
        lte: new Date(endDate)
      }
    }),
    ...(status && { status })
  };
  
  const [records, total] = await Promise.all([
    prisma.attendance.findMany({
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
        date: 'desc'
      }
    }),
    prisma.attendance.count({ where })
  ]);
  
  return {
    records,
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / limit)
  };
};

const getAttendanceById = async (id) => {
  const record = await prisma.attendance.findUnique({
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
  
  if (!record) {
    throw new Error('Attendance record not found');
  }
  
  return record;
};

const clockIn = async (employeeId, notes = '') => {
  // Check if employee already clocked in today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const existingRecord = await prisma.attendance.findFirst({
    where: {
      employeeId: parseInt(employeeId),
      date: {
        gte: today,
        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    }
  });
  
  if (existingRecord && existingRecord.checkIn) {
    throw new Error('Employee already clocked in today');
  }
  
  // Create or update attendance record
  let record;
  if (existingRecord) {
    record = await prisma.attendance.update({
      where: { id: existingRecord.id },
      data: {
        checkIn: new Date(),
        notes: notes || existingRecord.notes
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
  } else {
    record = await prisma.attendance.create({
      data: {
        employeeId: parseInt(employeeId),
        date: today,
        checkIn: new Date(),
        notes
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
  }
  
  return record;
};

const clockOut = async (employeeId, notes = '') => {
  // Find today's attendance record
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const record = await prisma.attendance.findFirst({
    where: {
      employeeId: parseInt(employeeId),
      date: {
        gte: today,
        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    }
  });
  
  if (!record) {
    throw new Error('No attendance record found for today');
  }
  
  if (!record.checkIn) {
    throw new Error('Employee must clock in before clocking out');
  }
  
  if (record.checkOut) {
    throw new Error('Employee already clocked out today');
  }
  
  // Calculate work hours
  const checkInTime = new Date(record.checkIn);
  const checkOutTime = new Date();
  const workHours = (checkOutTime - checkInTime) / (1000 * 60 * 60); // in hours
  
  // Update attendance record
  const updatedRecord = await prisma.attendance.update({
    where: { id: record.id },
    data: {
      checkOut: checkOutTime,
      notes: notes || record.notes
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
  
  return { updatedRecord, workHours };
};

const updateAttendance = async (id, updateData) => {
  const { checkIn, checkOut, breakDuration, status, notes } = updateData;
  
  const existingRecord = await prisma.attendance.findUnique({
    where: { id: parseInt(id) }
  });
  
  if (!existingRecord) {
    throw new Error('Attendance record not found');
  }
  
  const record = await prisma.attendance.update({
    where: { id: parseInt(id) },
    data: {
      ...(checkIn && { checkIn: new Date(checkIn) }),
      ...(checkOut && { checkOut: new Date(checkOut) }),
      ...(breakDuration !== undefined && { breakDuration: parseInt(breakDuration) }),
      ...(status && { status }),
      ...(notes && { notes })
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
  
  return record;
};

const deleteAttendance = async (id) => {
  const existingRecord = await prisma.attendance.findUnique({
    where: { id: parseInt(id) }
  });
  
  if (!existingRecord) {
    throw new Error('Attendance record not found');
  }
  
  await prisma.attendance.delete({
    where: { id: parseInt(id) }
  });
  
  return { message: 'Attendance record deleted successfully' };
};

const getAttendanceReport = async (filters = {}) => {
  const { 
    employeeId, 
    startDate, 
    endDate, 
    department, 
    page = 1, 
    limit = 10 
  } = filters;
  const skip = (page - 1) * limit;
  
  const where = {
    ...(employeeId && { employeeId: parseInt(employeeId) }),
    ...(startDate && endDate && {
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    }),
    ...(startDate && !endDate && {
      date: {
        gte: new Date(startDate)
      }
    }),
    ...(!startDate && endDate && {
      date: {
        lte: new Date(endDate)
      }
    }),
    ...(department && {
      employee: {
        user: {
          departmentId: parseInt(department)
        }
      }
    })
  };
  
  const [records, total] = await Promise.all([
    prisma.attendance.findMany({
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
                email: true,
                department: true
              }
            }
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    }),
    prisma.attendance.count({ where })
  ]);
  
  // Calculate summary statistics
  const summary = {
    totalRecords: records.length,
    present: records.filter(r => r.status === 'PRESENT').length,
    absent: records.filter(r => r.status === 'ABSENT').length,
    late: records.filter(r => r.status === 'LATE').length,
    halfDay: records.filter(r => r.status === 'HALF_DAY').length,
    leave: records.filter(r => r.status === 'LEAVE').length
  };
  
  return {
    records,
    summary,
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / limit)
  };
};

const getAttendanceStats = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const [todayRecords, thisMonthRecords, totalRecords] = await Promise.all([
    prisma.attendance.findMany({
      where: {
        date: {
          gte: today,
          lt: tomorrow
        }
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
    }),
    prisma.attendance.findMany({
      where: {
        date: {
          gte: new Date(today.getFullYear(), today.getMonth(), 1)
        }
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
    }),
    prisma.attendance.count()
  ]);
  
  const todayStats = {
    total: todayRecords.length,
    present: todayRecords.filter(r => r.status === 'PRESENT').length,
    absent: todayRecords.filter(r => r.status === 'ABSENT').length,
    late: todayRecords.filter(r => r.status === 'LATE').length,
    clockedIn: todayRecords.filter(r => r.checkIn).length,
    clockedOut: todayRecords.filter(r => r.checkOut).length
  };
  
  const monthStats = {
    total: thisMonthRecords.length,
    present: thisMonthRecords.filter(r => r.status === 'PRESENT').length,
    absent: thisMonthRecords.filter(r => r.status === 'ABSENT').length,
    late: thisMonthRecords.filter(r => r.status === 'LATE').length
  };
  
  return {
    today: todayStats,
    month: monthStats,
    total: totalRecords
  };
};

module.exports = {
  getAllAttendanceRecords,
  getAttendanceById,
  clockIn,
  clockOut,
  updateAttendance,
  deleteAttendance,
  getAttendanceReport,
  getAttendanceStats
};