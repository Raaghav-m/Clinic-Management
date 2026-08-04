-- Clinic sample data: 8 patients, 8 doctors, 10 appointments, 8 consultations, 8 prescriptions

USE clinic_db;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE prescription;
TRUNCATE TABLE consultation;
TRUNCATE TABLE appointment;
TRUNCATE TABLE patient;
TRUNCATE TABLE doctor;
SET FOREIGN_KEY_CHECKS = 1;

-- Patients
INSERT INTO patient (id, name, gender, phone, email, age, address, emergency_contact, blood_group) VALUES
(1, 'Priya Sharma', 'Female', '9876543210', 'priya.sharma@gmail.com', 34,
 '14 MG Road, Koramangala, Bangalore', '9123456780', 'O+'),
(2, 'Arjun Mehta', 'Male', '9823456710', 'arjun.mehta@yahoo.com', 52,
 '22 Park Street, Kolkata', '9834567890', 'A+'),
(3, 'Lakshmi Iyer', 'Female', '9845678901', 'lakshmi.iyer@outlook.com', 28,
 '8 Anna Salai, T Nagar, Chennai', '9856789012', 'B+'),
(4, 'Rahul Kapoor', 'Male', '9867890123', 'rahul.kapoor@gmail.com', 41,
 '5 Bandra West, Mumbai', '9878901234', 'AB+'),
(5, 'Sneha Patel', 'Female', '9889012345', 'sneha.patel@hotmail.com', 36,
 '19 SG Highway, Ahmedabad', '9890123456', 'O+'),
(6, 'Mohammed Farhan', 'Male', '9901234567', 'farhan.khan@gmail.com', 29,
 '3 Banjara Hills, Hyderabad', '9912345678', 'A+'),
(7, 'Divya Nair', 'Female', '9923456789', 'divya.nair@gmail.com', 47,
 '11 Marine Drive, Kochi', '9934567890', 'B+'),
(8, 'Karthik Venkatesh', 'Male', '9945678901', 'karthik.v@icloud.com', 38,
 '7 HSR Layout, Bangalore', '9956789012', 'O+');

-- Doctors
INSERT INTO doctor (id, name, specialization, experience, consultation_fee, start_time, end_time, phone) VALUES
(1, 'Dr. Ananya Reddy', 'Cardiology', 15, 1500.00, '09:00:00', '17:00:00', '9876000001'),
(2, 'Dr. Vikram Singh', 'Orthopedics', 12, 1200.00, '10:00:00', '18:00:00', '9876000002'),
(3, 'Dr. Meera Joshi', 'Dermatology', 8, 800.00, '09:30:00', '16:30:00', '9876000003'),
(4, 'Dr. Rajesh Kumar', 'General Medicine', 20, 600.00, '08:00:00', '20:00:00', '9876000004'),
(5, 'Dr. Sunita Rao', 'Pediatrics', 10, 900.00, '09:00:00', '15:00:00', '9876000005'),
(6, 'Dr. Amit Desai', 'Neurology', 18, 2000.00, '11:00:00', '19:00:00', '9876000006'),
(7, 'Dr. Kavitha Menon', 'Gynecology', 14, 1100.00, '10:00:00', '17:00:00', '9876000007'),
(8, 'Dr. Suresh Pillai', 'ENT', 11, 750.00, '09:00:00', '16:00:00', '9876000008');

-- Appointments (8 completed, 1 booked, 1 cancelled)
INSERT INTO appointment (id, patient_id, doctor_id, appointment_time, status) VALUES
(1, 1, 1, '2026-07-15 10:00:00', 'COMPLETED'),
(2, 2, 2, '2026-07-18 11:30:00', 'COMPLETED'),
(3, 3, 3, '2026-07-20 14:00:00', 'COMPLETED'),
(4, 4, 4, '2026-07-22 09:00:00', 'COMPLETED'),
(5, 5, 5, '2026-07-25 10:30:00', 'COMPLETED'),
(6, 6, 6, '2026-07-28 15:00:00', 'COMPLETED'),
(7, 7, 7, '2026-07-30 11:00:00', 'COMPLETED'),
(8, 8, 8, '2026-08-01 09:30:00', 'COMPLETED'),
(9, 1, 4, '2026-08-10 16:00:00', 'BOOKED'),
(10, 2, 1, '2026-08-12 10:00:00', 'CANCELLED');

-- Consultations (for completed appointments)
INSERT INTO consultation (id, appointment_id, symptoms, diagnosis, notes) VALUES
(1, 1, 'Chest pain, breathlessness on exertion',
 'Stable angina, mild hypertension',
 'ECG shows ST depression. Advised lifestyle changes and follow-up in 4 weeks.'),
(2, 2, 'Knee pain, swelling after morning walk',
 'Early osteoarthritis, right knee',
 'X-ray: mild joint space narrowing. Physiotherapy recommended.'),
(3, 3, 'Itchy rash on arms, redness for 2 weeks',
 'Contact dermatitis',
 'Patch test suggested. Avoid harsh soaps and synthetic fabrics.'),
(4, 4, 'Fever, sore throat, body ache for 3 days',
 'Viral upper respiratory infection',
 'Rest and hydration advised. Return if fever persists beyond 5 days.'),
(5, 5, 'Child: cough, runny nose, low-grade fever',
 'Acute viral bronchitis',
 'Parent counselled on steam inhalation. No antibiotics needed currently.'),
(6, 6, 'Recurrent headaches, blurred vision episodes',
 'Tension-type headache, rule out migraine',
 'MRI scheduled. Maintain sleep diary and reduce screen time.'),
(7, 7, 'Irregular periods, pelvic discomfort',
 'Polycystic ovary syndrome (PCOS)',
 'Ultrasound confirms ovarian cysts. Diet and exercise plan discussed.'),
(8, 8, 'Ear pain, blocked nose, reduced hearing',
 'Acute otitis media, bilateral sinus congestion',
 'Steam inhalation twice daily. Follow-up ENT check in 10 days.');

-- Prescriptions (one per consultation)
INSERT INTO prescription (id, consultation_id, medicine, dosage, frequency, duration, instructions) VALUES
(1, 1, 'Amlodipine 5mg + Aspirin 75mg',
 '1 tablet each', 'Once daily after breakfast', '30 days',
 'Monitor BP at home. Avoid skipping doses.'),
(2, 2, 'Diclofenac 50mg + Glucosamine 750mg',
 '1 tab Diclofenac, 1 cap Glucosamine', 'Twice daily after meals', '14 days',
 'Apply ice pack if swelling increases. Avoid squatting.'),
(3, 3, 'Cetirizine 10mg + Hydrocortisone 1% cream',
 '1 tablet + thin layer on rash', 'Tablet at night, cream twice daily', '7 days',
 'Do not scratch affected areas. Wear loose cotton clothing.'),
(4, 4, 'Paracetamol 650mg + Ambroxol syrup',
 '1 tablet / 10ml syrup', 'Three times daily', '5 days',
 'Take plenty of fluids. Complete full course even if feeling better.'),
(5, 5, 'Salbutamol inhaler + Montelukast 4mg chewable',
 '2 puffs / 1 tablet', 'Inhaler as needed, tablet at bedtime', '7 days',
 'Use spacer with inhaler. Seek care if breathing worsens.'),
(6, 6, 'Propranolol 40mg + Sumatriptan 50mg',
 '1 tab Propranolol daily, Sumatriptan PRN', 'Daily + at headache onset', '30 days',
 'Avoid triggers: stress, skipped meals. Do not exceed 2 Sumatriptan/day.'),
(7, 7, 'Metformin 500mg + Myo-inositol 2g',
 '1 tablet + 1 sachet', 'Twice daily with meals', '90 days',
 'Track menstrual cycle. Weight loss target: 5 kg in 3 months.'),
(8, 8, 'Amoxicillin 500mg + Xylometazoline nasal drops',
 '1 capsule + 2 drops per nostril', 'Capsule thrice daily, drops twice daily', '7 days',
 'Complete antibiotic course. Do not use nasal drops beyond 5 days.');
