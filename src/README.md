# SiteKeeper - Backend Documentation


[Documento de Inicialización del proyecto](../README.md)

## General Description
SiteKeeper is an advanced platform for managing commercial spaces. This tool allows companies to efficiently coordinate daily tasks, maintain control over their facilities, and optimize the supervision of spaces and objects. SiteKeeper's backend is based on RESTful architecture and is designed to ensure scalability, security, and easy integration with the frontend, which has been developed in React.

## Why SiteKeeper? 
Managing commercial spaces presents unique challenges. Companies that handle multiple spaces face problems related to task management, staff coordination, and tracking objects within these spaces. SiteKeeper addresses these issues by providing a centralized platform that optimizes task and resource management, eliminating inefficiencies and reducing operational costs.

## What has SiteKeeper been created for? 
SiteKeeper aims to automate and improve commercial space management operations. The platform offers administrators a clear and centralized view of the status of their facilities, allowing for faster problem response, efficient task assignment, and better resource supervision.

## Who is SiteKeeper designed for?
SiteKeeper is designed for companies in various sectors that manage commercial facilities, such as shopping centers, corporate offices, industrial facilities, or any organization that requires effective supervision of physical spaces. Both facility managers and maintenance employees can benefit from this platform, thanks to its modular and adaptable approach.

## Chosen Theme
The main theme of SiteKeeper revolves around the efficient management of commercial spaces, addressing everyday problems of maintenance, supervision, and task optimization. The solution is designed to offer an easy-to-use platform that centralizes all operations related to space management.

---

## Members:

1. **Jerónimo Betancur Duque**
   - Mail: [jeronimobeta90gmail.com](mailto:jeronimobeta90gmail.com)
   - LinkedIn: [https://www.linkedin.com/in/jeronimo-betancur-duque-491a50229/](https://www.linkedin.com/in/jeronimo-betancur-duque-491a50229/)
   - GitHub: [https://github.com/betancito](https://github.com/betancito)

2. **Andrés Jiménez**
   - Mail: [andres.jimenezv@hotmail.com](mailto:andres.jimenezv@hotmail.com)
   - LinkedIn: [www.linkedin.com/in/andres-jimenez-854238323/](www.linkedin.com/in/andres-jimenez-854238323/)
   - GitHub: [github.com/AarFeE](https://github.com/AarFeE)

3. **Matías Mesa Zuluaga**
   - Mail: [18zuluaga1989@gmail.com](mailto:18zuluaga1989@gmail.com)
   - LinkedIn: [https://www.linkedin.com/in/matias-mesa-zuluaga-469823316/](https://www.linkedin.com/in/matias-mesa-zuluaga-469823316/)
   - GitHub: [https://github.com/18zuluaga](https://github.com/18zuluaga)

4. **José Manuel Bernal Yepes**
   - Mail: [jomabeye@gmail.com](mailto:jomabeye@gmail.com)
   - LinkedIn: [https://www.linkedin.com/in/jose-manuel-bernal-yepes-510315267/](https://www.linkedin.com/in/jose-manuel-bernal-yepes-510315267/)
   - GitHub: [https://github.com/JBernal27](https://github.com/JBernal27)

5. **Daniel Alejandro Sánchez**
   - Mail: [dani8angel3024@gmail.com](mailto:dani8angel3024@gmail.com)
   - LinkedIn: [https://www.linkedin.com/in/daniel-sanchez-angel-041845324/](https://www.linkedin.com/in/daniel-sanchez-angel-041845324/)
   - GitHub: [https://github.com/INAUTX](https://github.com/INAUTX)

6. **Santiago Zuluaga Duque**
   - Mail: [santiago.zuluagad2000@gmail.com](mailto:santiago.zuluagad2000@gmail.com)
   - LinkedIn: [https://www.linkedin.com/in/santiago-zuluaga-duque-b71589247/](https://www.linkedin.com/in/santiago-zuluaga-duque-b71589247/)
   - GitHub: [https://github.com/santiagozuluaga23](https://github.com/santiagozuluaga23)

---

## Main Backend Features 

### 1. Space Management 
- **Creation and Editing of Spaces:** Administrators can create new spaces, update them, or delete them. Each space is associated with a physical location and can include objects, such as furniture or equipment, which are managed from the platform.
- **Relationships between Spaces and Objects:** Each space has a list of associated objects that administrators can add, update, or remove. This ensures that inventories are correctly updated.

### 2. Task Management
- **Task Assignment to Employees:** The system allows administrators to assign specific tasks to employees responsible for maintaining the spaces. Tasks can be associated with a space and have parameters such as priority, deadline, and completion status.
- **Employee Dashboard:** Each employee has access to a dashboard where they can view all tasks assigned to them, prioritize them, and update them as needed.
- **Routine Automation:** Administrators can create recurring maintenance routines (daily, weekly, monthly) to ensure that spaces are always in good condition.

### 3. Object Management
- **Object Supervision:** Objects within each space, such as furniture or equipment, can be managed centrally. Administrators can update the status of these objects and ensure that inventories are updated in real-time.
- **Lost Object Reporting:** SiteKeeper allows both employees and administrators to report lost objects within the spaces. Administrators can review these reports, prioritize their resolution, and update the status of the object in question.

### 4. Security and Authentication
- **JWT Authentication:** The backend uses JWT (JSON Web Tokens) authentication to ensure that only authorized users can access the platform. Tokens expire after a set time for increased security.
- **Roles and Permissions:** Each user has a specific role (administrator, employee) that determines the permissions and actions they can perform on the platform. Permission validation ensures that only the right users can modify certain resources.

### 5. Reports and Dashboard
- **Report Generation:** Administrators can generate detailed reports on the status of spaces, completed tasks, reported issues, and other key indicators. These reports help make informed decisions and optimize facility management.
- **Centralized Dashboard:** The admin panel offers a clear view of all ongoing activities, pending tasks, and reported issues. This allows administrators to prioritize actions and maintain effective supervision of all managed spaces.

### 6. Integration with the Frontend 
SiteKeeper's backend is fully integrated with the frontend through a REST API. All data related to spaces, tasks, and objects are sent and received in JSON format, ensuring efficient and secure communication between the system layers.

---

## Competitive Advantages
- **Modularity and Scalability:** SiteKeeper is designed to adapt to both small businesses and large corporations with multiple facilities. Its modular structure allows for the addition of new functionalities without affecting system stability.
- **Efficient Automation:** The automation of tasks, routines, and report generation reduces the administrative burden, allowing employees to focus on more critical activities.
- **Security and Privacy:** Sensitive company and space data are protected through a robust authentication and authorization system. Only authorized personnel can access confidential information.

---

## System Entities:

### 1. Spaces: 
- Fields: 
   - `id` (int): Unique identifier for the space.
   - `name` (varchar): Name of the space.
   - `location` (varchar): Location of the space.
   - `description` (text): Description of the space.
   - `image` (varchar): Representative image of the space.
- Relationships: A space can have several related objects and reports.

### 2. Objects: 
- Fields: 
   - `id` (int): Unique identifier for the object.
   - `name` (varchar): Name of the object.
   - `description` (text): Description of the object.
   - `image` (varchar): Representative image of the object.
   - `space_id` (int): Relationship with the space to which the object belongs.

### 3. Lost_Objects: 
- Fields: 
   - `id` (int): Unique identifier for the lost object.
   - `name` (varchar): Name of the lost object.
   - `description` (text): Description of the lost object.
   - `found_date` (datetime): Date when the object was found.
   - `state` (enum): State of the lost object (found or not).
   - `image` (varchar): Representative image of the lost object.
   - `space_id` (int): Relationship with the space where the object was found.

### 4. Reports: 
- Fields: 
   - `id` (int): Unique identifier for the report.
   - `name` (varchar): Name of the report.
   - `description` (text): Description of the report.
   - `is_event` (boolean): If the report corresponds to an event.
   - `state` (enum): State of the report.
   - `image` (varchar): Image associated with the report.
   - `space_id` (int): Relationship with the space to which the report belongs.
   - `the_date` (datetime): Date when the report was generated.

---

## Key Relationships:
- A space can have multiple related objects, as well as reports and lost objects.
- Reports and lost objects are directly linked to a space through the `space_id` column

--- 
# User Stories and Features

## 1. Space Management

### User Story: Space Visualization (Client)
As a registered client, I want to get a list of spaces assigned to me through an endpoint, so I can see the spaces I manage.
- **Acceptance Criteria:**
  - The endpoint must return details like the name, location, and status of the assigned space.
  - If there are no spaces assigned, an appropriate message should be returned.
- **Child Issues:**
  1. Create the endpoint to retrieve assigned spaces.
  2. Implement pagination and filters.
  3. Write unit and integration tests.

### User Story: Space Creation (Admin)
As an administrator, I want to create a space through an endpoint to add it to the system.
- **Acceptance Criteria:**
  - Validate data such as the space name, location, and administrator permissions.
- **Child Issues:**
  1. Create the space creation service.
  2. Implement data validation.
  3. Write unit tests.

---

## 2. Task and Routine Management

### User Story: Routine Creation and Editing (Admin)
As an administrator, I want to create and edit routines to organize staff activities.
- **Acceptance Criteria:**
  - Validate permissions and routine data (frequency, tasks).
- **Child Issues:**
  1. Create the endpoint for routine creation.
  2. Implement unit tests.

### User Story: Task Assignment (Admin)
As an administrator, I want to assign tasks to employees to ensure efficiency in managed spaces.
- **Acceptance Criteria:**
  - Task details must be validated, and administrator permissions should be checked.
- **Child Issues:**
  1. Create the endpoint for task assignment.
  2. Implement permission validation.

---

## 3. Object Management

### User Story: Object Management (Admin)
As an administrator, I want to manage objects within a space, to add, update, or remove objects.
- **Acceptance Criteria:**
  - The endpoint must validate object data (name, type, status).
- **Child Issues:**
  1. Create the object management endpoint.
  2. Implement validations and tests.

### User Story: Lost Object Search (Client)
As a registered client, I want to search for lost objects in the spaces.
- **Acceptance Criteria:**
  - Filters by date, object type, and permission validation should be implemented.
- **Child Issues:**
  1. Create the lost object search endpoint.
  2. Implement filters and tests.

---

## 4. User Management

### User Story: Staff Management (Admin)
As an administrator, I want to manage staff to add, edit, or remove employees in the system.
- **Acceptance Criteria:**
  - Validate administrator permissions and employee data.
- **Child Issues:**
  1. Create the staff management endpoint.
  2. Implement validation and tests.

---

## 5. Report Management

### User Story: Report Creation (Client)
As a registered client, I want to create a report about issues in a space.
- **Acceptance Criteria:**
  - Validate client access to the space and report data.
- **Child Issues:**
  1. Create the service for report creation.
  2. Implement unit tests.

### User Story: Report Visualization (Admin)
As an administrator, I want to see all reports to manage issues.
- **Acceptance Criteria:**
  - Allow filtering reports by space, status, or date.
- **Child Issues:**
  1. Create the report visualization endpoint.
  2. Implement filters and tests.

---

## 6. Dashboard

### User Story: Admin Dashboard
As an administrator, I want to see a summary of routines, tasks, and reports on a dashboard.
- **Acceptance Criteria:**
  - Validate administrator permissions and show tasks ordered by priority or date.
- **Child Issues:**
  1. Create the service that returns the data summary.
  2. Implement tests for the dashboard.

### User Story: Staff Dashboard
As a staff member, I want to see my assigned tasks on a dashboard.
- **Acceptance Criteria:**
  - Validate that only the user’s tasks are displayed and allow them to be sorted by date or priority.
- **Child Issues:**
  1. Create the task visualization endpoint.
  2. Implement tests for the dashboard.
