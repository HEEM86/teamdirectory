INSERT INTO department (name)
VALUES ("department_engineering");

INSERT INTO department (name)
VALUES ("department_IT");

INSERT INTO department (name) 
VALUES ("department_HR");


INSERT INTO role (title, salary, department_id) 
VALUES ("title1", 100000.17, 1);

INSERT INTO role (title, salary, department_id) 
VALUES ("title2", 100000.17, 3);

INSERT INTO role (title, salary, department_id) 
VALUES ("title3", 100000.17, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Oscar", "Johnson", 3, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Jessica", "West", 1, 1);