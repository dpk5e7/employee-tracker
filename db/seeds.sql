INSERT INTO department (name)
VALUES ("Force Users"),
       ("Clone Army"),
       ("Gangsters");

INSERT INTO role (title, salary, department_id)
VALUES ("Jedi", 100, 1),
       ("Sith", 99, 1),
       ("Commander", 91, 2),
       ("Captain", 90, 2),
       ("Bounty Hunters", 81, 3),
       ("Smugglers", 80, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ben", "Kenobi", 1, null),
       ("Luke", "Skywalker", 1, 1),
       ("Darth", "Sidious", 2, null),
       ("Darth", "Vader", 2, 3),
       ("Cody", "Clone", 3, null),
       ("Rex", "Clone", 4, 5),
       ("Boba", "Fett", 5, null),
       ("Han", "Solo", 6, null),
       ("Chew", "bacca", 6, 8);
       
