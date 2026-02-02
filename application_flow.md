Cleaning Services CRM — Full Application Flow Document


---

1. Product Overview

Objective

Build a lightweight but full‑fledged CRM for cleaning services (residential + commercial) to manage:

Leads → Quotes → Jobs → Invoices → Payments

Scheduling & assignment of cleaners

Customer history, properties, notes, and activity logs


This document is intended to be directly downloadable and shareable with designers, developers, or AI coding tools.


---

2. User Roles

1. Admin / Owner

Full access

Pricing, services, team, reports, financials


2. Manager / Dispatcher

Lead handling

Scheduling & job assignment

Quality check


3. Cleaner / Field Staff

View assigned jobs

Update job status

Checklist completion

Upload before/after photos


4. Accountant (optional)

Invoice management

Payment reconciliation

Reports



---

3. Core Entities

Customer

Property / Address

Lead

Quote / Estimate

Job / Booking

Team Member

Checklist Template

Invoice

Payment

Activity Log

Service Catalog



---

4. Application Navigation

Web App (Admin / Manager)

Dashboard

Leads

Customers

Quotes

Jobs (Calendar + List)

Invoices

Payments

Team

Reports

Settings


Mobile View (Cleaner)

My Jobs Today

Job Details

Checklist

Upload Photos



---

5. Status Flows

Lead Status

New → Contacted → Walkthrough Scheduled → Quote Sent → Won / Lost


Quote Status

Draft → Sent → Accepted → Rejected → Expired


Job Status

Scheduled → Assigned → In Progress → Completed → Quality Check → Closed


Invoice Status

Draft → Sent → Partially Paid → Paid → Overdue → Void



---

6. Screens & Functionality


---

Screen 1: Login

Fields

Email / Phone

Password


Actions

Login

Forgot Password


Rules

Cleaner → My Jobs

Admin/Manager → Dashboard



---

Screen 2: Dashboard

KPIs

Today’s Jobs

Open Leads

Unassigned Jobs

Overdue Invoices

Revenue (Weekly / Monthly)


Widgets

Today’s Schedule

Follow‑ups Due


Quick Actions

New Lead


New Quote


Schedule Job




---

Screen 3: Leads List

Columns

Lead ID

Name

Phone

Source

Service Interest

Status

Next Follow‑up


Actions

Create Lead

Assign Owner

Convert to Quote

Mark Lost



---

Screen 4: Lead Detail

Sections

Lead Summary

Customer (create/link)

Property

Notes & Activity Timeline

Follow‑up Scheduler


Actions

Mark Contacted

Create Quote

Mark Lost (reason mandatory)



---

Screen 5: Customers List

Columns

Name / Company

Phone

Email

Tags

Last Job Date

Outstanding Amount


Actions

Add Customer

Export



---

Screen 6: Customer Profile

Tabs

Overview

Properties

Jobs

Quotes

Invoices

Notes


Actions

Add Property

Create Quote

Schedule Job



---

Screen 7: Quote Builder

Line Items

Service

Quantity

Rate

Add‑ons


Totals

Subtotal

Discount

Tax

Total


Actions

Save Draft

Send Quote (WhatsApp/Email)

Accept Quote

Convert to Job



---

Screen 8: Jobs Calendar

Views

Day / Week / Month


Actions

Drag‑drop scheduling

Assign team

Reschedule



---

Screen 9: Job Detail (Admin)

Sections

Job Summary

Assigned Team

Services

Checklist

Photos

Invoice Panel


Actions

Assign Team

Mark Completed

Quality Check

Generate Invoice



---

Screen 10: Cleaner – My Jobs

Displays

Time

Customer Name

Address

Service Type


Actions

Start Job

Navigate

Call Customer



---

Screen 11: Cleaner – Job Detail

Features

Checklist

Timer

Before/After Photos

Completion Notes


Actions

Start Job

Mark Completed



---

Screen 12: Invoices

Columns

Invoice #

Customer

Amount

Due Date

Status


Actions

Send Invoice

Add Payment

Download PDF



---

Screen 13: Payments

Columns

Date

Customer

Invoice

Method

Amount



---

Screen 14: Team Management

Fields

Name

Role

Skills

Availability


Actions

Add Team Member

Deactivate



---

Screen 15: Reports

Revenue Summary

Jobs by Cleaner

Lead Conversion

Outstanding Payments



---

Screen 16: Settings

Service Catalog

Checklist Templates

Tax & Invoice Settings

Message Templates

Roles & Permissions



---

7. Mock Data (Example)

Service

Deep Cleaning – ₹3499 / BHK

Regular Cleaning – ₹1499 / visit

Office Cleaning – ₹3 / sq ft


Customer

Name: Rohit Mehra

Phone: 98XXXXXX12

Address: Green Park, Delhi


Job

Service: Deep Cleaning

Date: 5 Feb 2026

Assigned Cleaner: Raju


Invoice

Invoice No: INV‑2026‑0021

Amount: ₹3499

Status: Paid



---

8. Acceptance Criteria

Lead → Quote → Job → Invoice flow works end‑to‑end

Cleaner can complete job from mobile

Payments tracked correctly

Dashboard reflects real‑time status



---

9. Future Enhancements (Optional)

Customer payment portal

Auto reminders

Subscription cleaning plans

Review collection

Route optimization



---

End of Document
