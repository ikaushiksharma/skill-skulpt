# **Skill Skulpt**

# **Requirements Document**

## **1. Introduction**

Skill Skulpt is an AI-powered web application designed to enable users to generate courses using content available on the web, including blogs and YouTube videos. Users have the flexibility to create customized courses tailored to their specific learning needs. Additionally, users can choose to make their generated courses public, allowing others to benefit from their curated learning materials.

## **2. User Roles**

Skill Skulpt supports the following user roles:

- Creators: Users who generate courses using the platform.
- Learners: Users who access and learn from the courses created by Creators.

## **3. Functional Requirements**

### **3.1 Registration and Authentication**

- Users can register with Skill Skulpt by providing basic information such as name, email, and password.
- Upon registration, users can authenticate themselves using their credentials to access the platform.

### **3.2 User Profile**

- Each user has a profile page where they can view and update their personal information.
- Users can choose their role (Creator or Learner) during registration and update it later if necessary.

### **3.3 Creator Features**

- Generate Courses: Creators can generate courses by providing keywords or topics of interest. The platform utilizes AI algorithms to search and aggregate relevant content from the web, including blogs and YouTube videos, to create comprehensive course materials.
- Course Customization: Creators can customize the generated courses by adding, removing, or reordering content modules.
- Publish Courses: Creators can make their generated courses public, allowing other users to access and learn from them.
- Analytics: Creators have access to analytics tools to track the performance and engagement of their published courses.

### **3.4 Learner Features**

- Browse Courses: Learners can browse and search for courses created by Creators based on their interests and learning goals.
- Enroll in Courses: Learners can enroll in courses to access the curated learning materials.
- Progress Tracking: Learners can track their progress within enrolled courses, including completed modules and overall course completion status.
- Feedback and Ratings: Learners can provide feedback and ratings for courses they have completed, helping Creators improve the quality of their content.

## **4. Non-Functional Requirements**

### **4.1 Performance**

- The platform should be responsive and scalable to handle concurrent user interactions.
- Page load times should be optimized to provide a seamless user experience.

### **4.2 Security**

- User data should be encrypted during transmission and storage to ensure privacy and security.
- Authentication mechanisms should be robust to prevent unauthorized access to user accounts.

### **4.3 Usability**

- The user interface should be intuitive and user-friendly, with clear navigation and informative feedback messages.
- Accessibility standards should be followed to ensure that the platform is usable by individuals with disabilities.

### **4.4 Compatibility**

- The platform should be compatible with a wide range of devices and web browsers to accommodate diverse user preferences.

## **Design Document**

### **1. Architecture Overview**

Skill Skulpt follows a modular architecture based on the MERN (MongoDB, Express.js, React.js, Node.js) stack, with Next.js for the frontend:

- Frontend: Developed using Next.js and Shadcn UI for building interactive user interfaces.
- Backend: Built using Node.js, Express.js, and MongoDB for developing the server-side logic.
- Database: MongoDB is used to store user data, course content, and other relevant information.

### **2. Database Design**

The MongoDB database consists of the following collections:

- Users: Stores user information including name, email, password hash, role, and profile details.
- Courses: Contains course metadata, including title, description, creator, enrollment status, and analytics data.
- Course Content: Stores the content modules of each course, including title, content type (e.g., blog, video), and source URL.

### **3. API Design**

Skill Skulpt backend provides the following RESTful APIs:

- Authentication APIs: Register, login, and manage user sessions using JWT tokens.
- Course APIs: Create, update, delete, and retrieve course data.
- User Profile APIs: Manage user profiles and preferences.

### **4. Frontend Design**

The frontend is designed using Next.js and Shadcn UI for styling. It consists of the following main components:

- Navigation Bar: Provides navigation links to different sections of the platform, including course browsing, user profile, and course creation.
- Course Catalog: Displays a list of available courses with search and filtering options.
- Course Viewer: Allows learners to view course content modules and track their progress.

### **5. Deployment**

Skill Skulpt can be deployed on cloud platforms such as AWS, Google Cloud Platform, Microsoft Azure or Vercel (using serverless functions). The frontend can be hosted using services like Vercel (for Next.js applications), while the backend can be deployed on platforms supporting Node.js applications like Vercel (serverless functions) or Heroku. MongoDB Atlas can be used for database hosting.

### **6. Security**

Skill Skulpt implements security best practices including encryption of sensitive data, input validation, protection against common web vulnerabilities such as cross-site scripting (XSS) and SQL injection, and secure authentication mechanisms using JWT tokens.

### **7. Maintenance and Support**

Regular maintenance and updates should be performed to keep the platform up-to-date with the latest technologies and security patches. A support system should be in place to address user inquiries, bug reports, and feature requests in a timely manner.

### **8. Conclusion**

Skill Skulpt aims to revolutionize online learning by empowering users to create and share customized courses tailored to their learning needs. By following the outlined design principles and implementing the suggested features, Skill Skulpt seeks to foster a collaborative learning community where knowledge is accessible and democratized for all users.
