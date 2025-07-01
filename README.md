# ZENTACT

This is a CRM app for leads management.

## Hosted Link

[Demo link](https://crm-frontend-eight-phi.vercel.app/)

## Technologies

- NodeJS
- JavaScript
- React
- Express
- Mongoose

## Demo Video

[Demo Video Link](https://drive.google.com/file/d/1JWr-FwhAWZoTFN7PJMTZYdQDF-kbHwrK/view?usp=sharing)

# Frontend (React) Checklist

## Lead Management

### Implement a LeadForm with necessary input fields:

- Lead Name (Customer or company name)
- Lead Source (Dropdown: Website, Referral, etc.)
- Assigned Sales Agent (Dropdown selection)
- Lead Status (Dropdown: New, Contacted, etc.)
- Tags (Multi-select for categorization)
- Time to Close (Estimated closure time)
- Priority (High, Medium, Low)
- Ensure proper validation on form submission.

### Lead List & Filters

- Fetch and display leads dynamically (GET /leads).
- Implement URL-based filtering (e.g., /leads?salesAgent=John&status=Qualified).
- Sorting options for closing date & priority.

### Lead Details & Actions

- Show detailed lead information.
- Enable status updates & reassignment.
- Comments Section for agent updates.
- LeadStatusView (Grouped by status).
- SalesAgentView (Grouped by agent).

### Reporting & Analytics

- Leads Closed Last Week visualization.
- Total Leads in Pipeline.
- Lead Status Distribution in charts.
- Chart.js integration for reporting.

# Backend (Express + MongoDB) Checklist

## API Endpoints

### Leads Management

- POST /leads - Create a lead.
- GET /leads - Fetch leads with filters.
- PATCH /leads/:id - Update lead details.
- DELETE /leads/:id - Remove lead.

### Sales Agents

- POST /agents - Add a sales agent.
- GET /agents - Retrieve all agents.

### Comments

- POST /leads/:id/comments - Add lead comment.
- GET /leads/:id/comments - View comments.

### Reports

- GET /report/last-week - Fetch closed leads.
- GET /report/pipeline - Leads currently active.

# Key Features

- Lead Workflow Management with structured status updates.

- Sales Agent Assignment & Updates.

- Comments System for lead progress tracking.

- Filtering via URL parameters for better navigation.

- Dashboard & Data Visualization with Chart.js.
