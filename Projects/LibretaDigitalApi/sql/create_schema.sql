SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY "ADMUSR".usr_usuario DROP CONSTRAINT usr_usuario_per_persona_fk;
ALTER TABLE ONLY "ADMPER".per_persona DROP CONSTRAINT per_persona_per_tipo_identificador_fk;
ALTER TABLE ONLY "ADMPER".per_persona DROP CONSTRAINT per_persona_per_nacionalidad_fk;
ALTER TABLE ONLY "ADMUSR".usr_usuario DROP CONSTRAINT usr_usuario_pk;
ALTER TABLE ONLY "ADMPER".per_tipo_identificador DROP CONSTRAINT per_tipo_identificador_pk;
ALTER TABLE ONLY "ADMPER".per_persona DROP CONSTRAINT per_persona_unique;
ALTER TABLE ONLY "ADMPER".per_persona DROP CONSTRAINT per_persona_pk;
ALTER TABLE ONLY "ADMPER".per_nacionalidad DROP CONSTRAINT per_nacionalidad_pk;
ALTER TABLE ONLY "ADMLDA".lda_menor DROP CONSTRAINT lda_menor_pk;
ALTER TABLE "ADMUSR".usr_usuario ALTER COLUMN iden_usuario DROP DEFAULT;
ALTER TABLE "ADMPER".per_tipo_identificador ALTER COLUMN iden_tipo_identificador DROP DEFAULT;
ALTER TABLE "ADMPER".per_persona ALTER COLUMN iden_persona DROP DEFAULT;
ALTER TABLE "ADMPER".per_nacionalidad ALTER COLUMN iden_nacionalidad DROP DEFAULT;
ALTER TABLE "ADMLDA".lda_menor ALTER COLUMN iden_menor DROP DEFAULT;
DROP SEQUENCE "ADMUSR".usr_usuario_iden_usuario_seq;
DROP TABLE "ADMUSR".usr_usuario;
DROP SEQUENCE "ADMPER".per_tipo_identificador_iden_tipo_identificador_seq;
DROP TABLE "ADMPER".per_tipo_identificador;
DROP SEQUENCE "ADMPER".per_persona_iden_persona_seq;
DROP TABLE "ADMPER".per_persona;
DROP SEQUENCE "ADMPER".per_nacionalidad_iden_nacionalidad_seq;
DROP TABLE "ADMPER".per_nacionalidad;
DROP SEQUENCE "ADMLDA".lda_menor_iden_menor_seq;
DROP TABLE "ADMLDA".lda_menor;
DROP SCHEMA "ADMUSR";
DROP SCHEMA "ADMPER";
DROP SCHEMA "ADMLDA";

CREATE SCHEMA "ADMLDA";

ALTER SCHEMA "ADMLDA" OWNER TO libreta_digital_sql_user;

CREATE SCHEMA "ADMPER";

ALTER SCHEMA "ADMPER" OWNER TO libreta_digital_sql_user;

CREATE SCHEMA "ADMUSR";

ALTER SCHEMA "ADMUSR" OWNER TO libreta_digital_sql_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE "ADMLDA".lda_menor (
    iden_menor integer NOT NULL,
    desc_nombre character varying NOT NULL,
    desc_apellido_paterno character varying NOT NULL,
    desc_apellido_materno character varying,
    fech_nacimiento date,
    flag_activo boolean DEFAULT true,
    flag_eliminado boolean DEFAULT false
);

ALTER TABLE "ADMLDA".lda_menor OWNER TO libreta_digital_sql_user;

CREATE SEQUENCE "ADMLDA".lda_menor_iden_menor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "ADMLDA".lda_menor_iden_menor_seq OWNER TO libreta_digital_sql_user;

ALTER SEQUENCE "ADMLDA".lda_menor_iden_menor_seq OWNED BY "ADMLDA".lda_menor.iden_menor;

CREATE TABLE "ADMPER".per_nacionalidad (
    iden_nacionalidad integer NOT NULL,
    desc_nacionalidad character varying NOT NULL,
    flag_activo boolean DEFAULT true,
    flag_eliminado boolean DEFAULT false
);

ALTER TABLE "ADMPER".per_nacionalidad OWNER TO libreta_digital_sql_user;

CREATE SEQUENCE "ADMPER".per_nacionalidad_iden_nacionalidad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "ADMPER".per_nacionalidad_iden_nacionalidad_seq OWNER TO libreta_digital_sql_user;

ALTER SEQUENCE "ADMPER".per_nacionalidad_iden_nacionalidad_seq OWNED BY "ADMPER".per_nacionalidad.iden_nacionalidad;

CREATE TABLE "ADMPER".per_persona (
    iden_persona integer NOT NULL,
    desc_primer_nombre character varying NOT NULL,
    desc_segundo_nombre character varying,
    desc_apellido_paterno character varying,
    desc_apellido_materno character varying,
    iden_tipo_identificador integer NOT NULL,
    desc_run character varying,
    char_dv character(1),
    desc_dni character varying,
    iden_nacionalidad integer,
    flag_activo boolean DEFAULT true,
    flag_eliminado boolean DEFAULT false
);

ALTER TABLE "ADMPER".per_persona OWNER TO libreta_digital_sql_user;

COMMENT ON TABLE "ADMPER".per_persona IS 'Tabla personalizada para almacenar personas reales con rut o dni';

CREATE SEQUENCE "ADMPER".per_persona_iden_persona_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "ADMPER".per_persona_iden_persona_seq OWNER TO libreta_digital_sql_user;

ALTER SEQUENCE "ADMPER".per_persona_iden_persona_seq OWNED BY "ADMPER".per_persona.iden_persona;

CREATE TABLE "ADMPER".per_tipo_identificador (
    iden_tipo_identificador integer NOT NULL,
    desc_tipo_identificador character varying NOT NULL,
    flag_activo boolean DEFAULT true,
    flag_eliminado boolean DEFAULT false
);

ALTER TABLE "ADMPER".per_tipo_identificador OWNER TO libreta_digital_sql_user;

CREATE SEQUENCE "ADMPER".per_tipo_identificador_iden_tipo_identificador_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "ADMPER".per_tipo_identificador_iden_tipo_identificador_seq OWNER TO libreta_digital_sql_user;

ALTER SEQUENCE "ADMPER".per_tipo_identificador_iden_tipo_identificador_seq OWNED BY "ADMPER".per_tipo_identificador.iden_tipo_identificador;

CREATE TABLE "ADMUSR".usr_usuario (
    iden_usuario integer NOT NULL,
    iden_persona integer NOT NULL,
    desc_password character varying NOT NULL,
    flag_activo boolean DEFAULT true,
    flag_eliminado boolean DEFAULT false
);

ALTER TABLE "ADMUSR".usr_usuario OWNER TO libreta_digital_sql_user;

CREATE SEQUENCE "ADMUSR".usr_usuario_iden_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "ADMUSR".usr_usuario_iden_usuario_seq OWNER TO libreta_digital_sql_user;

ALTER SEQUENCE "ADMUSR".usr_usuario_iden_usuario_seq OWNED BY "ADMUSR".usr_usuario.iden_usuario;

ALTER TABLE ONLY "ADMLDA".lda_menor ALTER COLUMN iden_menor SET DEFAULT nextval('"ADMLDA".lda_menor_iden_menor_seq'::regclass);

ALTER TABLE ONLY "ADMPER".per_nacionalidad ALTER COLUMN iden_nacionalidad SET DEFAULT nextval('"ADMPER".per_nacionalidad_iden_nacionalidad_seq'::regclass);

ALTER TABLE ONLY "ADMPER".per_persona ALTER COLUMN iden_persona SET DEFAULT nextval('"ADMPER".per_persona_iden_persona_seq'::regclass);

ALTER TABLE ONLY "ADMPER".per_tipo_identificador ALTER COLUMN iden_tipo_identificador SET DEFAULT nextval('"ADMPER".per_tipo_identificador_iden_tipo_identificador_seq'::regclass);

ALTER TABLE ONLY "ADMUSR".usr_usuario ALTER COLUMN iden_usuario SET DEFAULT nextval('"ADMUSR".usr_usuario_iden_usuario_seq'::regclass);

ALTER TABLE ONLY "ADMLDA".lda_menor
    ADD CONSTRAINT lda_menor_pk PRIMARY KEY (iden_menor);

ALTER TABLE ONLY "ADMPER".per_nacionalidad
    ADD CONSTRAINT per_nacionalidad_pk PRIMARY KEY (iden_nacionalidad);

ALTER TABLE ONLY "ADMPER".per_persona
    ADD CONSTRAINT per_persona_pk PRIMARY KEY (iden_persona);

ALTER TABLE ONLY "ADMPER".per_persona
    ADD CONSTRAINT per_persona_unique UNIQUE (desc_run);

ALTER TABLE ONLY "ADMPER".per_tipo_identificador
    ADD CONSTRAINT per_tipo_identificador_pk PRIMARY KEY (iden_tipo_identificador);

ALTER TABLE ONLY "ADMUSR".usr_usuario
    ADD CONSTRAINT usr_usuario_pk PRIMARY KEY (iden_usuario);

ALTER TABLE ONLY "ADMPER".per_persona
    ADD CONSTRAINT per_persona_per_nacionalidad_fk FOREIGN KEY (iden_nacionalidad) REFERENCES "ADMPER".per_nacionalidad(iden_nacionalidad);

ALTER TABLE ONLY "ADMPER".per_persona
    ADD CONSTRAINT per_persona_per_tipo_identificador_fk FOREIGN KEY (iden_tipo_identificador) REFERENCES "ADMPER".per_tipo_identificador(iden_tipo_identificador);

ALTER TABLE ONLY "ADMUSR".usr_usuario
    ADD CONSTRAINT usr_usuario_per_persona_fk FOREIGN KEY (iden_persona) REFERENCES "ADMPER".per_persona(iden_persona);
