USE full_stack;

CREATE TABLE IF NOT EXISTS Admin (
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(30) NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Employee (
   id INT NOT NULL AUTO_INCREMENT,
   adminId INT NOT NULL,
   name VARCHAR(30) NOT NULL,
   PRIMARY KEY (id),
   FOREIGN KEY (adminId) REFERENCES Admin(id)
);

CREATE TABLE IF NOT EXISTS Performance (
    id INT NOT NULL AUTO_INCREMENT,
    employeeId INT NOT NULL,
    content VARCHAR(150),
    create_ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_ts TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (employeeId) REFERENCES Employee(id)
); 

CREATE TABLE IF NOT EXISTS Feedback (
    id INT NOT NULL AUTO_INCREMENT,
    feedbackerId INT NOT NULL,
    perfId INT NOT NULL,
    content VARCHAR(150),
    create_ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_ts TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (feedbackerId) REFERENCES Employee(id),
    FOREIGN KEY (perfId) REFERENCES Performance(id)
); 

CREATE TABLE IF NOT EXISTS Performance_Feedback (
   feedbackerId INT NOT NULL,
   perfId INT NOT NULL,
   employeeId INT NOT NULL,
   feedbackId INT,
   PRIMARY KEY (feedbackerId, perfId),
   FOREIGN KEY (feedbackerId) REFERENCES Employee(id),
   FOREIGN KEY (perfId) REFERENCES Performance(id),
   FOREIGN KEY (employeeId) REFERENCES Employee(id),
   FOREIGN KEY (feedbackId) REFERENCES Feedback(id)
);
