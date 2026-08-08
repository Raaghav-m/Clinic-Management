-- Clinic seed data (runs on empty database via SqlDatabaseSeeder in Docker profile)
-- Password placeholder is replaced at runtime with a BCrypt hash for Password@123

-- Users (admin, receptionists, patients, doctors)
INSERT INTO users (id, name, email, phone, password, role) VALUES
(1, 'Clinic Admin', 'admin@clinic.com', '9000000001', '__BCRYPT_PASSWORD__', 'ADMIN'),
(2, 'Anita Reception', 'receptionist1@clinic.com', '9000000002', '__BCRYPT_PASSWORD__', 'RECEPTIONIST'),
(3, 'Ravi FrontDesk', 'receptionist2@clinic.com', '9000000003', '__BCRYPT_PASSWORD__', 'RECEPTIONIST'),
(4, 'Priya Sharma', 'priya.sharma@gmail.com', '9876543210', '__BCRYPT_PASSWORD__', 'PATIENT'),
(5, 'Arjun Mehta', 'arjun.mehta@yahoo.com', '9823456710', '__BCRYPT_PASSWORD__', 'PATIENT'),
(6, 'Lakshmi Iyer', 'lakshmi.iyer@outlook.com', '9845678901', '__BCRYPT_PASSWORD__', 'PATIENT'),
(7, 'Rahul Kapoor', 'rahul.kapoor@gmail.com', '9867890123', '__BCRYPT_PASSWORD__', 'PATIENT'),
(8, 'Sneha Patel', 'sneha.patel@hotmail.com', '9889012345', '__BCRYPT_PASSWORD__', 'PATIENT'),
(9, 'Mohammed Farhan', 'farhan.khan@gmail.com', '9901234567', '__BCRYPT_PASSWORD__', 'PATIENT'),
(10, 'Dr. Ananya Reddy', 'ananya.reddy@clinic.com', '9876000001', '__BCRYPT_PASSWORD__', 'DOCTOR'),
(11, 'Dr. Vikram Singh', 'vikram.singh@clinic.com', '9876000002', '__BCRYPT_PASSWORD__', 'DOCTOR'),
(12, 'Dr. Meera Joshi', 'meera.joshi@clinic.com', '9876000003', '__BCRYPT_PASSWORD__', 'DOCTOR'),
(13, 'Dr. Rajesh Kumar', 'rajesh.kumar@clinic.com', '9876000004', '__BCRYPT_PASSWORD__', 'DOCTOR'),
(14, 'Dr. Sunita Rao', 'sunita.rao@clinic.com', '9876000005', '__BCRYPT_PASSWORD__', 'DOCTOR');

-- Patients
INSERT INTO patient (id, gender, address, emergency_contact, blood_group, user_id) VALUES
(1, 'Female', '14 MG Road, Koramangala, Bangalore', '9123456780', 'O+', 4),
(2, 'Male', '22 Park Street, Kolkata', '9834567890', 'A+', 5),
(3, 'Female', '8 Anna Salai, T Nagar, Chennai', '9856789012', 'B+', 6),
(4, 'Male', '5 Bandra West, Mumbai', '9878901234', 'AB+', 7),
(5, 'Female', '19 SG Highway, Ahmedabad', '9890123456', 'O+', 8),
(6, 'Male', '3 Banjara Hills, Hyderabad', '9912345678', 'A+', 9);

-- Doctors
INSERT INTO doctor (id, specialization, experience, consultation_fee, start_time, end_time, user_id) VALUES
(1, 'Cardiology', 15, 1500.00, '09:00:00', '17:00:00', 10),
(2, 'Orthopedics', 12, 1200.00, '10:00:00', '18:00:00', 11),
(3, 'Dermatology', 8, 800.00, '09:30:00', '16:30:00', 12),
(4, 'General Medicine', 20, 600.00, '08:00:00', '20:00:00', 13),
(5, 'Pediatrics', 10, 900.00, '09:00:00', '15:00:00', 14);

-- Appointments
INSERT INTO appointment (id, patient_id, doctor_id, appointment_time, status) VALUES
(1, 1, 1, '2026-07-15 10:00:00', 'COMPLETED'),
(2, 2, 2, '2026-07-18 11:30:00', 'COMPLETED'),
(3, 3, 3, '2026-07-20 14:00:00', 'COMPLETED'),
(4, 4, 4, '2026-07-22 09:00:00', 'COMPLETED'),
(5, 5, 5, '2026-07-25 10:30:00', 'COMPLETED'),
(6, 6, 1, '2026-07-28 15:00:00', 'COMPLETED'),
(7, 1, 4, '2026-08-10 16:00:00', 'BOOKED'),
(8, 2, 1, '2026-08-12 10:00:00', 'CANCELLED');

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
 'MRI scheduled. Maintain sleep diary and reduce screen time.');

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
 'Avoid triggers: stress, skipped meals. Do not exceed 2 Sumatriptan/day.');

-- Reset auto-increment counters after explicit IDs
ALTER TABLE users AUTO_INCREMENT = 15;
ALTER TABLE patient AUTO_INCREMENT = 7;
ALTER TABLE doctor AUTO_INCREMENT = 6;
ALTER TABLE appointment AUTO_INCREMENT = 9;
ALTER TABLE consultation AUTO_INCREMENT = 7;
ALTER TABLE prescription AUTO_INCREMENT = 7;
