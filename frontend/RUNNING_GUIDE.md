# HR Management System Frontend - Running Guide

## 📋 Overview

This is a comprehensive React-based frontend for the HR Management System with 10 major modules built following Figma design specifications.

### 📦 Modules Included

1. **Dashboard** - Overview of HR metrics, attendance trends, department distribution, and recent activity
2. **Employee Management** - CRUD operations for employees with search and filtering
3. **Onboarding & Offboarding** - Manage new employee onboarding with task tracking
4. **Attendance & Time Tracking** - Track employee attendance with clock in/out and reports
5. **Leave Management** - Leave request handling and balance tracking
6. **Training & Development** - Course enrollment and progress tracking
7. **Payroll Management** - Salary processing and payroll reports
8. **Expense Management** - Expense claim submission and approval workflow
9. **Performance Management** - Goals, reviews, and skill assessments
10. **Roles & Permissions** - Manage roles and user access control

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- Backend API running on `http://localhost:3000`

### Installation Steps

#### 1. Navigate to Frontend Directory

```bash
cd frontend
```

#### 2. Install Dependencies

```bash
npm install
```

This will install:
- React 18.2.0
- React Router v6
- Bootstrap 5
- Recharts (for data visualization)
- React Icons (for UI icons)
- Axios (for API calls)

#### 3. Create Environment Variables

Create a `.env` file in the `frontend` directory:

```env
# Frontend Configuration
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_ENVIRONMENT=development
```

---

## 📱 Running the Application

### Development Mode

```bash
npm start
```

This will:
- Start the development server on `http://localhost:3000`
- Open the app in your default browser
- Enable hot reloading for development

**Note:** You may see a warning about proxy conflicts. This is normal - the frontend will communicate with the backend via the configured API URL.

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

---

## 🔐 Login Credentials

Use these credentials to test the application:

```
Email: john@company.com
Password: password123

Roles:
- ADMIN: admin@company.com
- HR: hr@company.com
- MANAGER: manager@company.com
- EMPLOYEE: employee@company.com
```

---

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── KPICard.jsx
│   │   ├── DataTable.jsx
│   │   ├── Chart.jsx
│   │   ├── Badge.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── PageCard.jsx
│   │   ├── StatCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── Card.jsx
│   │
│   ├── pages/               # Page components
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Employees.jsx
│   │   ├── Attendance.jsx
│   │   ├── Onboarding.jsx
│   │   ├── Leave.jsx
│   │   ├── Training.jsx
│   │   ├── Payroll.jsx
│   │   ├── Expense.jsx
│   │   ├── Performance.jsx
│   │   └── Roles.jsx
│   │
│   ├── routes/              # Routing configuration
│   │   └── AppRoutes.jsx
│   │
│   ├── context/             # React Context API
│   │   └── AuthContext.jsx
│   │
│   ├── services/            # API services
│   │   └── api.js
│   │
│   ├── styles/              # CSS stylesheets
│   │   ├── Dashboard.css
│   │   ├── Employees.css
│   │   ├── KPICard.css
│   │   ├── DataTable.css
│   │   ├── Chart.css
│   │   └── ... (other styles)
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── .env
└── README.md
```

---

## 🎨 UI Components

### Core Reusable Components

| Component | Purpose | Usage |
|-----------|---------|-------|
| `KPICard` | Display key performance indicators | Dashboard, all pages |
| `DataTable` | Render paginated data tables | Employee, Leave, Payroll pages |
| `Chart` | Display charts (line, bar, pie, radar) | Dashboard, Performance pages |
| `Badge` | Status badges | Throughout app |
| `ProgressBar` | Progress tracking | Training, Goals, Leave |
| `PageCard` | Container card | Page content wrapper |
| `StatCard` | Statistics card | Quick stats displays |

### Component Example Usage

```jsx
// KPI Card
<KPICard
  title="Total Employees"
  value="1,234"
  change="+12%"
  icon={FaUsers}
  color="primary"
/>

// Data Table
<DataTable
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ]}
  data={employeeData}
  pagination={true}
  currentPage={1}
/>

// Chart
<ChartComponent
  type="line"
  data={chartData}
  dataKey="month"
  lines={[{ dataKey: 'sales' }]}
/>
```

---

## 🔄 Features & Workflows

### 1. Dashboard
- KPI metrics (Total Employees, Present Today, On Leave, Avg Hours)
- Attendance trend chart (6-month view)
- Department distribution pie chart
- Recent activity feed
- Upcoming events sidebar

### 2. Employee Management
- Search and filter employees by department
- View employee details (name, email, phone, role, status)
- Add/Edit/Delete employee functionality
- Export employee list
- Pagination support

### 3. Onboarding
- Track active onboarding processes
- Progress tracking with visual steps
- Onboarding task management
- Status indicators (Done, In Progress, Pending)
- Assign tasks to team members

### 4. Attendance
- Daily attendance tracking
- Weekly trend visualization
- Clock in/out timestamps
- Work hours calculation
- Status badges (Present, Late, Absent, On Leave)

### 5. Leave Management
- Leave balance overview
- Leave type breakdown (Sick, Vacation, Personal, Unpaid)
- Request leave functionality
- Leave request table with approval workflow
- Pending/Approved/Rejected statuses

### 6. Training
- Active training enrollment display
- Course progress tracking
- Available courses catalog
- Completion percentage visualization
- Course categories and duration info

### 7. Payroll
- Monthly payroll summary
- Payroll trend chart (6-month)
- Detailed salary breakdown (earnings + deductions)
- Net salary calculation
- Payroll processing status

### 8. Expense Management
- Expense claim submission
- Category-wise expense breakdown (donut chart)
- Claim approval workflow
- Status tracking (Pending, Approved, Rejected)
- Expense history

### 9. Performance
- Overall rating display
- Skills assessment radar chart
- Current goals tracking
- Review cycle status (4-step process)
- Goal progress visualization

### 10. Roles & Permissions
- System roles display (5 predefined roles)
- User count per role
- Permission matrix view
- Role-based access control
- Custom role creation

---

## 🔌 API Integration

The frontend communicates with the backend API via Axios. Configure the API base URL in your `.env` file:

```env
REACT_APP_API_URL=http://localhost:3000/api
```

### API Endpoints Used

```
Authentication:
POST   /auth/register
POST   /auth/login
GET    /auth/profile
PUT    /auth/profile

Employees:
GET    /employees
GET    /employees/:id
POST   /employees
PUT    /employees/:id
DELETE /employees/:id

Attendance:
GET    /attendance
POST   /attendance/clock-in
POST   /attendance/clock-out

Leave:
GET    /leave/requests
POST   /leave/requests
PUT    /leave/requests/:id

And more...
```

---

## 🎯 Testing the App

### 1. Start Backend Server
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:3000
```

### 2. Start Frontend (in another terminal)
```bash
cd frontend
npm start
# Opens http://localhost:3000 in browser
```

### 3. Login with Test Credentials
- Email: `john@company.com`
- Password: `password123`

### 4. Explore Modules
- Navigate using the sidebar menu
- Test filters and search functionality
- Verify data tables and charts render correctly
- Check responsive design on different screen sizes

---

## 🛠️ Development Tips

### Adding New Data to Tables

```jsx
const [employees, setEmployees] = useState([
  { id: 1, name: 'John', email: 'john@company.com', ... },
]);
```

### Updating Chart Data

```jsx
const [chartData, setChartData] = useState([
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 150 },
]);
```

### Implementing API Calls

```jsx
import { employeesAPI } from '../services/api';

useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const response = await employeesAPI.getAll();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };
  fetchEmployees();
}, []);
```

---

## 📊 Common Tasks

### Change KPI Values
Edit the state initialization in page components:
```jsx
const [stats, setStats] = useState({
  total: '1,234',
  present: '1,156',
  // ...
});
```

### Modify Table Columns
Update the `columns` array in DataTable:
```jsx
const columns = [
  { key: 'name', label: 'Employee Name' },
  { key: 'email', label: 'Email Address' },
];
```

### Update Chart Type
Change the `type` prop in ChartComponent:
```jsx
<ChartComponent type="bar" />  // or "pie", "line", "radar", "donut"
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000   # Windows
```

### Module Not Found Error
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### API Connection Error
- Ensure backend server is running on `http://localhost:3000`
- Check `.env` file has correct API URL
- Check CORS settings in backend

### Styles Not Loading
```bash
# Clear browser cache
npm start -- --reset-cache
```

---

## 📈 Performance Optimization

- Data tables use pagination to handle large datasets
- Charts are rendered using Recharts (optimized for SVG)
- Images and icons are optimized
- Lazy loading for routes (if needed)

---

## 🔒 Security Notes

- Authentication tokens stored in AuthContext
- Role-based access control implemented
- Protected routes enforce authorization
- Sensitive data not exposed in frontend

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [React Router v6](https://reactrouter.com)
- [Bootstrap 5](https://getbootstrap.com)
- [Recharts Documentation](https://recharts.org)
- [React Icons](https://react-icons.github.io/react-icons)

---

## ✅ Checklist Before Deployment

- [ ] Install all dependencies: `npm install`
- [ ] Create `.env` file with correct API URL
- [ ] Test all pages and features
- [ ] Verify responsive design
- [ ] Check browser console for errors
- [ ] Test authentication flow
- [ ] Verify data table pagination
- [ ] Test chart rendering
- [ ] Run production build: `npm run build`
- [ ] Test built app: `npm -g install serve && serve -s build`

---

## 📞 Support

For issues or questions:
1. Check the console for error messages
2. Verify backend API is running
3. Check `.env` configuration
4. Review component props and state
5. Ensure all dependencies are installed

---

## 🎉 You're All Set!

The frontend is now ready to use. Enjoy building with the HR Management System!

```bash
npm start
```

This command will start your development server and open the application in your browser at `http://localhost:3000`.
