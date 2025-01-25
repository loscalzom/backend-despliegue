CREATE TABLE wokspaces (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    owner INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES USERS(_id)
    
    )

    CREATE TABLE workspace_members (
     workspace_id INT ,
    user_id INT,
    PRIMARY KEY (workspace_id, user_id) //clave primaria compuesta
    FOREIGN KEY (workspace_id) REFERENCES workspaces(_id),
    FOREIGN KEY (user_id) REFERENCES USERS(_id)
 
    
    )