/*
Ici le script de la construction de la Base De Données memit et de ses tables
**/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
drop table if exists donor cascade;
drop table if exists association cascade;
drop table if exists project cascade;
drop table if exists donation cascade;

CREATE TABLE donor (
    id uuid DEFAULT uuid_generate_v4 (),
    PRIMARY KEY (id),
    pseudo VARCHAR (255) NOT NULL,
    surname VARCHAR (255) NOT NULL,
    firstname VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL,
    role CHAR (20),
);

CREATE TABLE association (
  id uuid DEFAULT uuid_generate_v4 (),
   PRIMARY KEY (id),
    name VARCHAR (50) NOT NULL,
    email VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL,
    siret CHAR (14) NOT NULL,
    rna CHAR (10) NOT NULL,
    theme CHAR (50) NOT NULL,
    url VARCHAR (255),
    body text,
    role CHAR (20),
  );

 CREATE TABLE donor_association_association (
    "donorId" uuid NOT null, 
    "associationId" uuid NOT null,
    constraint pk_donas primary key ("donorId","associationId"),
    CONSTRAINT fk_donor FOREIGN KEY ("donorId") 
    REFERENCES donor(id),
    CONSTRAINT fk_association FOREIGN KEY ("associationId") 
    REFERENCES association(id)
  );

  CREATE TABLE project (
    id uuid DEFAULT uuid_generate_v4 (),
    PRIMARY KEY (id),
    topic CHAR (50) NOT NULL,
    body text NOT NULL,
    url VARCHAR (255),
    CONSTRAINT fk_association FOREIGN KEY (association_id) 
    REFERENCES association(id)
  );

    CREATE TABLE donation (
    id uuid DEFAULT uuid_generate_v4 (),
    PRIMARY KEY (id),
    amount number NOT NULL,
    by_month boolean NOT NULL,
    date_creation DATE NOT NULL,
    CONSTRAINT fk_donor FOREIGN KEY (donor_id) 
    REFERENCES donor(id),
    CONSTRAINT fk_project FOREIGN KEY (project_id) 
    REFERENCES project(id)
  );





















