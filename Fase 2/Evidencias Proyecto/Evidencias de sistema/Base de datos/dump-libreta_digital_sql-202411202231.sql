--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8 (Debian 15.8-1.pgdg120+1)
-- Dumped by pg_dump version 15.3

-- Started on 2024-11-20 22:31:17

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

DROP DATABASE libreta_digital_sql;
--
-- TOC entry 3664 (class 1262 OID 16384)
-- Name: libreta_digital_sql; Type: DATABASE; Schema: -; Owner: libreta_digital_sql_user
--

CREATE DATABASE libreta_digital_sql WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE libreta_digital_sql OWNER TO libreta_digital_sql_user;

\connect libreta_digital_sql

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

--
-- TOC entry 6 (class 2615 OID 16389)
-- Name: ADMLDA; Type: SCHEMA; Schema: -; Owner: libreta_digital_sql_user
--

CREATE SCHEMA "ADMLDA";


ALTER SCHEMA "ADMLDA" OWNER TO libreta_digital_sql_user;

--
-- TOC entry 7 (class 2615 OID 16390)
-- Name: ADMPER; Type: SCHEMA; Schema: -; Owner: libreta_digital_sql_user
--

CREATE SCHEMA "ADMPER";


ALTER SCHEMA "ADMPER" OWNER TO libreta_digital_sql_user;

--
-- TOC entry 8 (class 2615 OID 16391)
-- Name: ADMUSR; Type: SCHEMA; Schema: -; Owner: libreta_digital_sql_user
--

CREATE SCHEMA "ADMUSR";


ALTER SCHEMA "ADMUSR" OWNER TO libreta_digital_sql_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 240 (class 1259 OID 16635)
-- Name: lda_comunicado; Type: TABLE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMLDA".lda_comunicado (
    iden_comunicado integer NOT NULL,
    desc_titulo character varying NOT NULL,
    desc_texto character varying NOT NULL,
    fech_visible date NOT NULL,
    iden_tipo_comunicado integer NOT NULL,
    flag_activo boolean DEFAULT true NOT NULL,
    flag_eliminado boolean DEFAULT false NOT NULL,
    flag_need_autorizacion boolean DEFAULT false NOT NULL,
    iden_persona_creador integer NOT NULL
);


ALTER TABLE "ADMLDA".lda_comunicado OWNER TO libreta_digital_sql_user;

--
-- TOC entry 244 (class 1259 OID 16656)
-- Name: lda_comunicado_menor; Type: TABLE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMLDA".lda_comunicado_menor (
    iden_comunicado_elementos integer NOT NULL,
    iden_comunicado integer NOT NULL,
    iden_menor integer,
    flag_activado boolean DEFAULT true NOT NULL,
    iden_educador integer,
    flag_visto boolean DEFAULT false NOT NULL
);


ALTER TABLE "ADMLDA".lda_comunicado_menor OWNER TO libreta_digital_sql_user;

--
-- TOC entry 243 (class 1259 OID 16655)
-- Name: lda_comunicado_elementos_iden_comunicado_elementos_seq; Type: SEQUENCE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMLDA".lda_comunicado_elementos_iden_comunicado_elementos_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMLDA".lda_comunicado_elementos_iden_comunicado_elementos_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3665 (class 0 OID 0)
-- Dependencies: 243
-- Name: lda_comunicado_elementos_iden_comunicado_elementos_seq; Type: SEQUENCE OWNED BY; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMLDA".lda_comunicado_elementos_iden_comunicado_elementos_seq OWNED BY "ADMLDA".lda_comunicado_menor.iden_comunicado_elementos;


--
-- TOC entry 239 (class 1259 OID 16634)
-- Name: lda_comunicado_iden_comunicado_seq; Type: SEQUENCE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMLDA".lda_comunicado_iden_comunicado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMLDA".lda_comunicado_iden_comunicado_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3666 (class 0 OID 0)
-- Dependencies: 239
-- Name: lda_comunicado_iden_comunicado_seq; Type: SEQUENCE OWNED BY; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMLDA".lda_comunicado_iden_comunicado_seq OWNED BY "ADMLDA".lda_comunicado.iden_comunicado;


--
-- TOC entry 230 (class 1259 OID 16500)
-- Name: lda_educador; Type: TABLE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMLDA".lda_educador (
    iden_educador integer NOT NULL,
    iden_persona integer NOT NULL,
    flag_activo boolean DEFAULT true NOT NULL,
    flag_eliminado boolean DEFAULT false NOT NULL
);


ALTER TABLE "ADMLDA".lda_educador OWNER TO libreta_digital_sql_user;

--
-- TOC entry 229 (class 1259 OID 16499)
-- Name: lda_educador_iden_educador_seq; Type: SEQUENCE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMLDA".lda_educador_iden_educador_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMLDA".lda_educador_iden_educador_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3667 (class 0 OID 0)
-- Dependencies: 229
-- Name: lda_educador_iden_educador_seq; Type: SEQUENCE OWNED BY; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMLDA".lda_educador_iden_educador_seq OWNED BY "ADMLDA".lda_educador.iden_educador;


--
-- TOC entry 264 (class 1259 OID 17446)
-- Name: lda_itinerario; Type: TABLE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMLDA".lda_itinerario (
    iden_itinerario integer NOT NULL,
    desc_titulo character varying NOT NULL,
    desc_descripcion character varying NOT NULL,
    fech_itinerario date NOT NULL,
    flag_activo boolean DEFAULT true NOT NULL,
    flag_eliminado boolean DEFAULT false NOT NULL,
    iden_usr_creador integer NOT NULL,
    fech_creacion timestamp without time zone NOT NULL,
    flag_realizado boolean DEFAULT false NOT NULL
);


ALTER TABLE "ADMLDA".lda_itinerario OWNER TO libreta_digital_sql_user;

--
-- TOC entry 263 (class 1259 OID 17445)
-- Name: lda_itinerario_iden_itinerario_seq; Type: SEQUENCE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMLDA".lda_itinerario_iden_itinerario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMLDA".lda_itinerario_iden_itinerario_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3668 (class 0 OID 0)
-- Dependencies: 263
-- Name: lda_itinerario_iden_itinerario_seq; Type: SEQUENCE OWNED BY; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMLDA".lda_itinerario_iden_itinerario_seq OWNED BY "ADMLDA".lda_itinerario.iden_itinerario;


--
-- TOC entry 266 (class 1259 OID 17462)
-- Name: lda_itinerario_menor; Type: TABLE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMLDA".lda_itinerario_menor (
    iden_itinerario_menor integer NOT NULL,
    iden_itinerario integer NOT NULL,
    iden_menor integer NOT NULL,
    flag_confirmado boolean DEFAULT false NOT NULL,
    iden_nivel integer NOT NULL
);


ALTER TABLE "ADMLDA".lda_itinerario_menor OWNER TO libreta_digital_sql_user;

--
-- TOC entry 265 (class 1259 OID 17461)
-- Name: lda_itinerario_menor_iden_itinerario_menor_seq; Type: SEQUENCE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMLDA".lda_itinerario_menor_iden_itinerario_menor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMLDA".lda_itinerario_menor_iden_itinerario_menor_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3669 (class 0 OID 0)
-- Dependencies: 265
-- Name: lda_itinerario_menor_iden_itinerario_menor_seq; Type: SEQUENCE OWNED BY; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMLDA".lda_itinerario_menor_iden_itinerario_menor_seq OWNED BY "ADMLDA".lda_itinerario_menor.iden_itinerario_menor;


--
-- TOC entry 234 (class 1259 OID 16563)
-- Name: lda_jornada; Type: TABLE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMLDA".lda_jornada (
    iden_jornada integer NOT NULL,
    desc_nombre character varying NOT NULL,
    desc_descripcion character varying,
    flag_activo boolean DEFAULT true NOT NULL,
    flag_eliminado boolean DEFAULT false NOT NULL,
    desc_hora_inicio character varying,
    desc_hora_final character varying
);


ALTER TABLE "ADMLDA".lda_jornada OWNER TO libreta_digital_sql_user;

--
-- TOC entry 233 (class 1259 OID 16562)
-- Name: lda_jornada_iden_jornada_seq; Type: SEQUENCE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMLDA".lda_jornada_iden_jornada_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMLDA".lda_jornada_iden_jornada_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3670 (class 0 OID 0)
-- Dependencies: 233
-- Name: lda_jornada_iden_jornada_seq; Type: SEQUENCE OWNED BY; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMLDA".lda_jornada_iden_jornada_seq OWNED BY "ADMLDA".lda_jornada.iden_jornada;


--
-- TOC entry 217 (class 1259 OID 16392)
-- Name: lda_menor; Type: TABLE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMLDA".lda_menor (
    iden_menor integer NOT NULL,
    flag_activo boolean DEFAULT true NOT NULL,
    flag_eliminado boolean DEFAULT false NOT NULL,
    iden_persona integer NOT NULL,
    iden_per_apoderado integer NOT NULL,
    iden_per_apoderado_sup integer,
    iden_jornada integer
);


ALTER TABLE "ADMLDA".lda_menor OWNER TO libreta_digital_sql_user;

--
-- TOC entry 218 (class 1259 OID 16399)
-- Name: lda_menor_iden_menor_seq; Type: SEQUENCE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMLDA".lda_menor_iden_menor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMLDA".lda_menor_iden_menor_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3671 (class 0 OID 0)
-- Dependencies: 218
-- Name: lda_menor_iden_menor_seq; Type: SEQUENCE OWNED BY; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMLDA".lda_menor_iden_menor_seq OWNED BY "ADMLDA".lda_menor.iden_menor;


--
-- TOC entry 232 (class 1259 OID 16551)
-- Name: lda_nivel; Type: TABLE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMLDA".lda_nivel (
    iden_nivel integer NOT NULL,
    desc_nombre character varying NOT NULL,
    desc_descripcion character varying,
    flag_activo boolean DEFAULT true NOT NULL,
    flag_eliminado boolean DEFAULT false NOT NULL,
    iden_sala integer
);


ALTER TABLE "ADMLDA".lda_nivel OWNER TO libreta_digital_sql_user;

--
-- TOC entry 231 (class 1259 OID 16550)
-- Name: lda_nivel_iden_nivel_seq; Type: SEQUENCE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMLDA".lda_nivel_iden_nivel_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMLDA".lda_nivel_iden_nivel_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3672 (class 0 OID 0)
-- Dependencies: 231
-- Name: lda_nivel_iden_nivel_seq; Type: SEQUENCE OWNED BY; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMLDA".lda_nivel_iden_nivel_seq OWNED BY "ADMLDA".lda_nivel.iden_nivel;


--
-- TOC entry 248 (class 1259 OID 16736)
-- Name: lda_nivel_menor; Type: TABLE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMLDA".lda_nivel_menor (
    iden_nivel_menor integer NOT NULL,
    iden_nivel integer NOT NULL,
    iden_menor integer NOT NULL,
    flag_activo boolean DEFAULT true NOT NULL,
    flag_eliminado boolean DEFAULT false NOT NULL
);


ALTER TABLE "ADMLDA".lda_nivel_menor OWNER TO libreta_digital_sql_user;

--
-- TOC entry 247 (class 1259 OID 16735)
-- Name: lda_nivel_menor_iden_nivel_menor_seq; Type: SEQUENCE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMLDA".lda_nivel_menor_iden_nivel_menor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMLDA".lda_nivel_menor_iden_nivel_menor_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3673 (class 0 OID 0)
-- Dependencies: 247
-- Name: lda_nivel_menor_iden_nivel_menor_seq; Type: SEQUENCE OWNED BY; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMLDA".lda_nivel_menor_iden_nivel_menor_seq OWNED BY "ADMLDA".lda_nivel_menor.iden_nivel_menor;


--
-- TOC entry 254 (class 1259 OID 16787)
-- Name: lda_paseo; Type: TABLE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMLDA".lda_paseo (
    iden_paseo integer NOT NULL,
    desc_titulo character varying NOT NULL,
    desc_descripcion character varying NOT NULL,
    iden_tipo_paseo integer NOT NULL,
    flag_activo boolean DEFAULT true NOT NULL,
    flag_eliminado boolean DEFAULT false NOT NULL,
    fech_inicio timestamp without time zone,
    fech_fin timestamp without time zone
);


ALTER TABLE "ADMLDA".lda_paseo OWNER TO libreta_digital_sql_user;

--
-- TOC entry 253 (class 1259 OID 16786)
-- Name: lda_paseo_iden_paseo_seq; Type: SEQUENCE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMLDA".lda_paseo_iden_paseo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMLDA".lda_paseo_iden_paseo_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3674 (class 0 OID 0)
-- Dependencies: 253
-- Name: lda_paseo_iden_paseo_seq; Type: SEQUENCE OWNED BY; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMLDA".lda_paseo_iden_paseo_seq OWNED BY "ADMLDA".lda_paseo.iden_paseo;


--
-- TOC entry 258 (class 1259 OID 16831)
-- Name: lda_paseo_menor; Type: TABLE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMLDA".lda_paseo_menor (
    iden_paseo_menor integer NOT NULL,
    iden_paseo integer NOT NULL,
    iden_menor integer NOT NULL,
    iden_nivel integer NOT NULL,
    flag_autorizado boolean DEFAULT false NOT NULL
);


ALTER TABLE "ADMLDA".lda_paseo_menor OWNER TO libreta_digital_sql_user;

--
-- TOC entry 257 (class 1259 OID 16830)
-- Name: lda_paseo_menor_iden_paseo_menor_seq; Type: SEQUENCE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMLDA".lda_paseo_menor_iden_paseo_menor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMLDA".lda_paseo_menor_iden_paseo_menor_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3675 (class 0 OID 0)
-- Dependencies: 257
-- Name: lda_paseo_menor_iden_paseo_menor_seq; Type: SEQUENCE OWNED BY; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMLDA".lda_paseo_menor_iden_paseo_menor_seq OWNED BY "ADMLDA".lda_paseo_menor.iden_paseo_menor;


--
-- TOC entry 256 (class 1259 OID 16798)
-- Name: lda_tipo_paseo; Type: TABLE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMLDA".lda_tipo_paseo (
    iden_tipo_paseo integer NOT NULL,
    desc_tipo_paseo character varying NOT NULL
);


ALTER TABLE "ADMLDA".lda_tipo_paseo OWNER TO libreta_digital_sql_user;

--
-- TOC entry 255 (class 1259 OID 16797)
-- Name: lda_paseo_tipo_iden_tipo_paseo_seq; Type: SEQUENCE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMLDA".lda_paseo_tipo_iden_tipo_paseo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMLDA".lda_paseo_tipo_iden_tipo_paseo_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3676 (class 0 OID 0)
-- Dependencies: 255
-- Name: lda_paseo_tipo_iden_tipo_paseo_seq; Type: SEQUENCE OWNED BY; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMLDA".lda_paseo_tipo_iden_tipo_paseo_seq OWNED BY "ADMLDA".lda_tipo_paseo.iden_tipo_paseo;


--
-- TOC entry 246 (class 1259 OID 16721)
-- Name: lda_reunion; Type: TABLE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMLDA".lda_reunion (
    iden_reunion integer NOT NULL,
    desc_titulo character varying NOT NULL,
    fech_reunion timestamp without time zone NOT NULL,
    iden_sala integer NOT NULL,
    flag_activo boolean DEFAULT true NOT NULL,
    flag_eliminado boolean DEFAULT false NOT NULL
);


ALTER TABLE "ADMLDA".lda_reunion OWNER TO libreta_digital_sql_user;

--
-- TOC entry 245 (class 1259 OID 16720)
-- Name: lda_reunion_iden_reunion_seq; Type: SEQUENCE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMLDA".lda_reunion_iden_reunion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMLDA".lda_reunion_iden_reunion_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3677 (class 0 OID 0)
-- Dependencies: 245
-- Name: lda_reunion_iden_reunion_seq; Type: SEQUENCE OWNED BY; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMLDA".lda_reunion_iden_reunion_seq OWNED BY "ADMLDA".lda_reunion.iden_reunion;


--
-- TOC entry 260 (class 1259 OID 17395)
-- Name: lda_reunion_menor; Type: TABLE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMLDA".lda_reunion_menor (
    iden_reunion_menor integer NOT NULL,
    iden_reunion integer NOT NULL,
    iden_menor integer NOT NULL,
    flag_confirmado boolean DEFAULT false NOT NULL,
    iden_nivel integer NOT NULL
);


ALTER TABLE "ADMLDA".lda_reunion_menor OWNER TO libreta_digital_sql_user;

--
-- TOC entry 259 (class 1259 OID 17394)
-- Name: lda_reunion_menor_iden_reunion_menor_seq; Type: SEQUENCE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMLDA".lda_reunion_menor_iden_reunion_menor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMLDA".lda_reunion_menor_iden_reunion_menor_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3678 (class 0 OID 0)
-- Dependencies: 259
-- Name: lda_reunion_menor_iden_reunion_menor_seq; Type: SEQUENCE OWNED BY; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMLDA".lda_reunion_menor_iden_reunion_menor_seq OWNED BY "ADMLDA".lda_reunion_menor.iden_reunion_menor;


--
-- TOC entry 262 (class 1259 OID 17425)
-- Name: lda_reunion_tema; Type: TABLE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMLDA".lda_reunion_tema (
    iden_reunion_tema integer NOT NULL,
    iden_reunion integer NOT NULL,
    desc_tema character varying NOT NULL,
    flag_eliminado boolean DEFAULT false NOT NULL
);


ALTER TABLE "ADMLDA".lda_reunion_tema OWNER TO libreta_digital_sql_user;

--
-- TOC entry 261 (class 1259 OID 17424)
-- Name: lda_reunion_tema_iden_reunion_tema_seq; Type: SEQUENCE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMLDA".lda_reunion_tema_iden_reunion_tema_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMLDA".lda_reunion_tema_iden_reunion_tema_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3679 (class 0 OID 0)
-- Dependencies: 261
-- Name: lda_reunion_tema_iden_reunion_tema_seq; Type: SEQUENCE OWNED BY; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMLDA".lda_reunion_tema_iden_reunion_tema_seq OWNED BY "ADMLDA".lda_reunion_tema.iden_reunion_tema;


--
-- TOC entry 236 (class 1259 OID 16584)
-- Name: lda_sala; Type: TABLE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMLDA".lda_sala (
    iden_sala integer NOT NULL,
    desc_nombre character varying NOT NULL,
    desc_descripcion character varying,
    flag_activo boolean DEFAULT true NOT NULL,
    flag_eliminado boolean DEFAULT false NOT NULL
);


ALTER TABLE "ADMLDA".lda_sala OWNER TO libreta_digital_sql_user;

--
-- TOC entry 235 (class 1259 OID 16583)
-- Name: lda_sala_iden_sala_seq; Type: SEQUENCE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMLDA".lda_sala_iden_sala_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMLDA".lda_sala_iden_sala_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3680 (class 0 OID 0)
-- Dependencies: 235
-- Name: lda_sala_iden_sala_seq; Type: SEQUENCE OWNED BY; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMLDA".lda_sala_iden_sala_seq OWNED BY "ADMLDA".lda_sala.iden_sala;


--
-- TOC entry 242 (class 1259 OID 16646)
-- Name: lda_tipo_comunicado; Type: TABLE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMLDA".lda_tipo_comunicado (
    iden_tipo_comunicado integer NOT NULL,
    desc_nombre character varying NOT NULL
);


ALTER TABLE "ADMLDA".lda_tipo_comunicado OWNER TO libreta_digital_sql_user;

--
-- TOC entry 241 (class 1259 OID 16645)
-- Name: lda_tipo_comunicado_iden_tipo_comunicado_seq; Type: SEQUENCE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMLDA".lda_tipo_comunicado_iden_tipo_comunicado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMLDA".lda_tipo_comunicado_iden_tipo_comunicado_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3681 (class 0 OID 0)
-- Dependencies: 241
-- Name: lda_tipo_comunicado_iden_tipo_comunicado_seq; Type: SEQUENCE OWNED BY; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMLDA".lda_tipo_comunicado_iden_tipo_comunicado_seq OWNED BY "ADMLDA".lda_tipo_comunicado.iden_tipo_comunicado;


--
-- TOC entry 250 (class 1259 OID 16760)
-- Name: lda_vacuna; Type: TABLE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMLDA".lda_vacuna (
    iden_vacuna integer NOT NULL,
    desc_nombre character varying NOT NULL,
    fech_vacunacion date NOT NULL,
    nmro_agno integer NOT NULL
);


ALTER TABLE "ADMLDA".lda_vacuna OWNER TO libreta_digital_sql_user;

--
-- TOC entry 249 (class 1259 OID 16759)
-- Name: lda_vacuna_iden_vacuna_seq; Type: SEQUENCE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMLDA".lda_vacuna_iden_vacuna_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMLDA".lda_vacuna_iden_vacuna_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3682 (class 0 OID 0)
-- Dependencies: 249
-- Name: lda_vacuna_iden_vacuna_seq; Type: SEQUENCE OWNED BY; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMLDA".lda_vacuna_iden_vacuna_seq OWNED BY "ADMLDA".lda_vacuna.iden_vacuna;


--
-- TOC entry 252 (class 1259 OID 16769)
-- Name: lda_vacuna_menor; Type: TABLE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMLDA".lda_vacuna_menor (
    iden_vacuna_menor integer NOT NULL,
    iden_vacuna integer NOT NULL,
    iden_menor integer NOT NULL,
    flag_autorizado boolean DEFAULT false NOT NULL
);


ALTER TABLE "ADMLDA".lda_vacuna_menor OWNER TO libreta_digital_sql_user;

--
-- TOC entry 251 (class 1259 OID 16768)
-- Name: lda_vacuna_menor_iden_vacuna_menor_seq; Type: SEQUENCE; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMLDA".lda_vacuna_menor_iden_vacuna_menor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMLDA".lda_vacuna_menor_iden_vacuna_menor_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3683 (class 0 OID 0)
-- Dependencies: 251
-- Name: lda_vacuna_menor_iden_vacuna_menor_seq; Type: SEQUENCE OWNED BY; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMLDA".lda_vacuna_menor_iden_vacuna_menor_seq OWNED BY "ADMLDA".lda_vacuna_menor.iden_vacuna_menor;


--
-- TOC entry 219 (class 1259 OID 16400)
-- Name: per_nacionalidad; Type: TABLE; Schema: ADMPER; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMPER".per_nacionalidad (
    iden_nacionalidad integer NOT NULL,
    desc_nacionalidad character varying NOT NULL,
    flag_activo boolean DEFAULT true NOT NULL
);


ALTER TABLE "ADMPER".per_nacionalidad OWNER TO libreta_digital_sql_user;

--
-- TOC entry 220 (class 1259 OID 16406)
-- Name: per_nacionalidad_iden_nacionalidad_seq; Type: SEQUENCE; Schema: ADMPER; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMPER".per_nacionalidad_iden_nacionalidad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMPER".per_nacionalidad_iden_nacionalidad_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3684 (class 0 OID 0)
-- Dependencies: 220
-- Name: per_nacionalidad_iden_nacionalidad_seq; Type: SEQUENCE OWNED BY; Schema: ADMPER; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMPER".per_nacionalidad_iden_nacionalidad_seq OWNED BY "ADMPER".per_nacionalidad.iden_nacionalidad;


--
-- TOC entry 221 (class 1259 OID 16407)
-- Name: per_persona; Type: TABLE; Schema: ADMPER; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMPER".per_persona (
    iden_persona integer NOT NULL,
    desc_primer_nombre character varying NOT NULL,
    desc_segundo_nombre character varying,
    desc_apellido_paterno character varying NOT NULL,
    desc_apellido_materno character varying,
    iden_tipo_identificador integer NOT NULL,
    desc_run character varying,
    char_dv character(1),
    desc_dni character varying,
    iden_nacionalidad integer,
    flag_activo boolean DEFAULT true NOT NULL,
    flag_eliminado boolean DEFAULT false NOT NULL,
    desc_email character varying,
    desc_tel character varying,
    desc_direccion character varying,
    fech_nacimiento date,
    iden_sexo integer DEFAULT 3 NOT NULL
);


ALTER TABLE "ADMPER".per_persona OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3685 (class 0 OID 0)
-- Dependencies: 221
-- Name: TABLE per_persona; Type: COMMENT; Schema: ADMPER; Owner: libreta_digital_sql_user
--

COMMENT ON TABLE "ADMPER".per_persona IS 'Tabla personalizada para almacenar personas reales con rut o dni';


--
-- TOC entry 222 (class 1259 OID 16414)
-- Name: per_persona_iden_persona_seq; Type: SEQUENCE; Schema: ADMPER; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMPER".per_persona_iden_persona_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMPER".per_persona_iden_persona_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3686 (class 0 OID 0)
-- Dependencies: 222
-- Name: per_persona_iden_persona_seq; Type: SEQUENCE OWNED BY; Schema: ADMPER; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMPER".per_persona_iden_persona_seq OWNED BY "ADMPER".per_persona.iden_persona;


--
-- TOC entry 238 (class 1259 OID 16620)
-- Name: per_sexo; Type: TABLE; Schema: ADMPER; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMPER".per_sexo (
    iden_sexo integer NOT NULL,
    desc_nombre character varying NOT NULL,
    code_sexo character(1) NOT NULL
);


ALTER TABLE "ADMPER".per_sexo OWNER TO libreta_digital_sql_user;

--
-- TOC entry 237 (class 1259 OID 16619)
-- Name: per_sexo_iden_sexo_seq; Type: SEQUENCE; Schema: ADMPER; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMPER".per_sexo_iden_sexo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMPER".per_sexo_iden_sexo_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3687 (class 0 OID 0)
-- Dependencies: 237
-- Name: per_sexo_iden_sexo_seq; Type: SEQUENCE OWNED BY; Schema: ADMPER; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMPER".per_sexo_iden_sexo_seq OWNED BY "ADMPER".per_sexo.iden_sexo;


--
-- TOC entry 223 (class 1259 OID 16415)
-- Name: per_tipo_identificador; Type: TABLE; Schema: ADMPER; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMPER".per_tipo_identificador (
    iden_tipo_identificador integer NOT NULL,
    desc_tipo_identificador character varying NOT NULL,
    flag_activo boolean DEFAULT true NOT NULL
);


ALTER TABLE "ADMPER".per_tipo_identificador OWNER TO libreta_digital_sql_user;

--
-- TOC entry 224 (class 1259 OID 16421)
-- Name: per_tipo_identificador_iden_tipo_identificador_seq; Type: SEQUENCE; Schema: ADMPER; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMPER".per_tipo_identificador_iden_tipo_identificador_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMPER".per_tipo_identificador_iden_tipo_identificador_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3688 (class 0 OID 0)
-- Dependencies: 224
-- Name: per_tipo_identificador_iden_tipo_identificador_seq; Type: SEQUENCE OWNED BY; Schema: ADMPER; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMPER".per_tipo_identificador_iden_tipo_identificador_seq OWNED BY "ADMPER".per_tipo_identificador.iden_tipo_identificador;


--
-- TOC entry 225 (class 1259 OID 16422)
-- Name: usr_rol; Type: TABLE; Schema: ADMUSR; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMUSR".usr_rol (
    iden_rol integer NOT NULL,
    desc_rol character varying NOT NULL,
    flag_activo boolean DEFAULT true NOT NULL
);


ALTER TABLE "ADMUSR".usr_rol OWNER TO libreta_digital_sql_user;

--
-- TOC entry 226 (class 1259 OID 16428)
-- Name: usr_rol_iden_rol_seq; Type: SEQUENCE; Schema: ADMUSR; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMUSR".usr_rol_iden_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMUSR".usr_rol_iden_rol_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3689 (class 0 OID 0)
-- Dependencies: 226
-- Name: usr_rol_iden_rol_seq; Type: SEQUENCE OWNED BY; Schema: ADMUSR; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMUSR".usr_rol_iden_rol_seq OWNED BY "ADMUSR".usr_rol.iden_rol;


--
-- TOC entry 227 (class 1259 OID 16434)
-- Name: usr_usuario; Type: TABLE; Schema: ADMUSR; Owner: libreta_digital_sql_user
--

CREATE TABLE "ADMUSR".usr_usuario (
    iden_usuario integer NOT NULL,
    iden_persona integer NOT NULL,
    desc_password character varying NOT NULL,
    flag_activo boolean DEFAULT true NOT NULL,
    flag_eliminado boolean DEFAULT false NOT NULL,
    iden_rol integer
);


ALTER TABLE "ADMUSR".usr_usuario OWNER TO libreta_digital_sql_user;

--
-- TOC entry 228 (class 1259 OID 16441)
-- Name: usr_usuario_iden_usuario_seq; Type: SEQUENCE; Schema: ADMUSR; Owner: libreta_digital_sql_user
--

CREATE SEQUENCE "ADMUSR".usr_usuario_iden_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ADMUSR".usr_usuario_iden_usuario_seq OWNER TO libreta_digital_sql_user;

--
-- TOC entry 3690 (class 0 OID 0)
-- Dependencies: 228
-- Name: usr_usuario_iden_usuario_seq; Type: SEQUENCE OWNED BY; Schema: ADMUSR; Owner: libreta_digital_sql_user
--

ALTER SEQUENCE "ADMUSR".usr_usuario_iden_usuario_seq OWNED BY "ADMUSR".usr_usuario.iden_usuario;


--
-- TOC entry 3351 (class 2604 OID 16638)
-- Name: lda_comunicado iden_comunicado; Type: DEFAULT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_comunicado ALTER COLUMN iden_comunicado SET DEFAULT nextval('"ADMLDA".lda_comunicado_iden_comunicado_seq'::regclass);


--
-- TOC entry 3356 (class 2604 OID 16659)
-- Name: lda_comunicado_menor iden_comunicado_elementos; Type: DEFAULT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_comunicado_menor ALTER COLUMN iden_comunicado_elementos SET DEFAULT nextval('"ADMLDA".lda_comunicado_elementos_iden_comunicado_elementos_seq'::regclass);


--
-- TOC entry 3338 (class 2604 OID 16503)
-- Name: lda_educador iden_educador; Type: DEFAULT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_educador ALTER COLUMN iden_educador SET DEFAULT nextval('"ADMLDA".lda_educador_iden_educador_seq'::regclass);


--
-- TOC entry 3378 (class 2604 OID 17449)
-- Name: lda_itinerario iden_itinerario; Type: DEFAULT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_itinerario ALTER COLUMN iden_itinerario SET DEFAULT nextval('"ADMLDA".lda_itinerario_iden_itinerario_seq'::regclass);


--
-- TOC entry 3382 (class 2604 OID 17465)
-- Name: lda_itinerario_menor iden_itinerario_menor; Type: DEFAULT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_itinerario_menor ALTER COLUMN iden_itinerario_menor SET DEFAULT nextval('"ADMLDA".lda_itinerario_menor_iden_itinerario_menor_seq'::regclass);


--
-- TOC entry 3344 (class 2604 OID 16566)
-- Name: lda_jornada iden_jornada; Type: DEFAULT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_jornada ALTER COLUMN iden_jornada SET DEFAULT nextval('"ADMLDA".lda_jornada_iden_jornada_seq'::regclass);


--
-- TOC entry 3322 (class 2604 OID 16442)
-- Name: lda_menor iden_menor; Type: DEFAULT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_menor ALTER COLUMN iden_menor SET DEFAULT nextval('"ADMLDA".lda_menor_iden_menor_seq'::regclass);


--
-- TOC entry 3341 (class 2604 OID 16554)
-- Name: lda_nivel iden_nivel; Type: DEFAULT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_nivel ALTER COLUMN iden_nivel SET DEFAULT nextval('"ADMLDA".lda_nivel_iden_nivel_seq'::regclass);


--
-- TOC entry 3362 (class 2604 OID 16739)
-- Name: lda_nivel_menor iden_nivel_menor; Type: DEFAULT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_nivel_menor ALTER COLUMN iden_nivel_menor SET DEFAULT nextval('"ADMLDA".lda_nivel_menor_iden_nivel_menor_seq'::regclass);


--
-- TOC entry 3368 (class 2604 OID 16790)
-- Name: lda_paseo iden_paseo; Type: DEFAULT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_paseo ALTER COLUMN iden_paseo SET DEFAULT nextval('"ADMLDA".lda_paseo_iden_paseo_seq'::regclass);


--
-- TOC entry 3372 (class 2604 OID 16834)
-- Name: lda_paseo_menor iden_paseo_menor; Type: DEFAULT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_paseo_menor ALTER COLUMN iden_paseo_menor SET DEFAULT nextval('"ADMLDA".lda_paseo_menor_iden_paseo_menor_seq'::regclass);


--
-- TOC entry 3359 (class 2604 OID 16724)
-- Name: lda_reunion iden_reunion; Type: DEFAULT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_reunion ALTER COLUMN iden_reunion SET DEFAULT nextval('"ADMLDA".lda_reunion_iden_reunion_seq'::regclass);


--
-- TOC entry 3374 (class 2604 OID 17398)
-- Name: lda_reunion_menor iden_reunion_menor; Type: DEFAULT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_reunion_menor ALTER COLUMN iden_reunion_menor SET DEFAULT nextval('"ADMLDA".lda_reunion_menor_iden_reunion_menor_seq'::regclass);


--
-- TOC entry 3376 (class 2604 OID 17428)
-- Name: lda_reunion_tema iden_reunion_tema; Type: DEFAULT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_reunion_tema ALTER COLUMN iden_reunion_tema SET DEFAULT nextval('"ADMLDA".lda_reunion_tema_iden_reunion_tema_seq'::regclass);


--
-- TOC entry 3347 (class 2604 OID 16587)
-- Name: lda_sala iden_sala; Type: DEFAULT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_sala ALTER COLUMN iden_sala SET DEFAULT nextval('"ADMLDA".lda_sala_iden_sala_seq'::regclass);


--
-- TOC entry 3355 (class 2604 OID 16649)
-- Name: lda_tipo_comunicado iden_tipo_comunicado; Type: DEFAULT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_tipo_comunicado ALTER COLUMN iden_tipo_comunicado SET DEFAULT nextval('"ADMLDA".lda_tipo_comunicado_iden_tipo_comunicado_seq'::regclass);


--
-- TOC entry 3371 (class 2604 OID 16801)
-- Name: lda_tipo_paseo iden_tipo_paseo; Type: DEFAULT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_tipo_paseo ALTER COLUMN iden_tipo_paseo SET DEFAULT nextval('"ADMLDA".lda_paseo_tipo_iden_tipo_paseo_seq'::regclass);


--
-- TOC entry 3365 (class 2604 OID 16763)
-- Name: lda_vacuna iden_vacuna; Type: DEFAULT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_vacuna ALTER COLUMN iden_vacuna SET DEFAULT nextval('"ADMLDA".lda_vacuna_iden_vacuna_seq'::regclass);


--
-- TOC entry 3366 (class 2604 OID 16772)
-- Name: lda_vacuna_menor iden_vacuna_menor; Type: DEFAULT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_vacuna_menor ALTER COLUMN iden_vacuna_menor SET DEFAULT nextval('"ADMLDA".lda_vacuna_menor_iden_vacuna_menor_seq'::regclass);


--
-- TOC entry 3325 (class 2604 OID 16443)
-- Name: per_nacionalidad iden_nacionalidad; Type: DEFAULT; Schema: ADMPER; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMPER".per_nacionalidad ALTER COLUMN iden_nacionalidad SET DEFAULT nextval('"ADMPER".per_nacionalidad_iden_nacionalidad_seq'::regclass);


--
-- TOC entry 3327 (class 2604 OID 16444)
-- Name: per_persona iden_persona; Type: DEFAULT; Schema: ADMPER; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMPER".per_persona ALTER COLUMN iden_persona SET DEFAULT nextval('"ADMPER".per_persona_iden_persona_seq'::regclass);


--
-- TOC entry 3350 (class 2604 OID 16623)
-- Name: per_sexo iden_sexo; Type: DEFAULT; Schema: ADMPER; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMPER".per_sexo ALTER COLUMN iden_sexo SET DEFAULT nextval('"ADMPER".per_sexo_iden_sexo_seq'::regclass);


--
-- TOC entry 3331 (class 2604 OID 16445)
-- Name: per_tipo_identificador iden_tipo_identificador; Type: DEFAULT; Schema: ADMPER; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMPER".per_tipo_identificador ALTER COLUMN iden_tipo_identificador SET DEFAULT nextval('"ADMPER".per_tipo_identificador_iden_tipo_identificador_seq'::regclass);


--
-- TOC entry 3333 (class 2604 OID 16446)
-- Name: usr_rol iden_rol; Type: DEFAULT; Schema: ADMUSR; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMUSR".usr_rol ALTER COLUMN iden_rol SET DEFAULT nextval('"ADMUSR".usr_rol_iden_rol_seq'::regclass);


--
-- TOC entry 3335 (class 2604 OID 16448)
-- Name: usr_usuario iden_usuario; Type: DEFAULT; Schema: ADMUSR; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMUSR".usr_usuario ALTER COLUMN iden_usuario SET DEFAULT nextval('"ADMUSR".usr_usuario_iden_usuario_seq'::regclass);


--
-- TOC entry 3632 (class 0 OID 16635)
-- Dependencies: 240
-- Data for Name: lda_comunicado; Type: TABLE DATA; Schema: ADMLDA; Owner: libreta_digital_sql_user
--



--
-- TOC entry 3636 (class 0 OID 16656)
-- Dependencies: 244
-- Data for Name: lda_comunicado_menor; Type: TABLE DATA; Schema: ADMLDA; Owner: libreta_digital_sql_user
--



--
-- TOC entry 3622 (class 0 OID 16500)
-- Dependencies: 230
-- Data for Name: lda_educador; Type: TABLE DATA; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMLDA".lda_educador VALUES (1, 2, true, false);


--
-- TOC entry 3656 (class 0 OID 17446)
-- Dependencies: 264
-- Data for Name: lda_itinerario; Type: TABLE DATA; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMLDA".lda_itinerario VALUES (2, 'Pintacaritas', 'Se realiza taller pintacaritas con menores', '2024-11-11', true, false, 2, '2024-11-20 19:22:00', true);


--
-- TOC entry 3658 (class 0 OID 17462)
-- Dependencies: 266
-- Data for Name: lda_itinerario_menor; Type: TABLE DATA; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMLDA".lda_itinerario_menor VALUES (1, 2, 1, true, 1);


--
-- TOC entry 3626 (class 0 OID 16563)
-- Dependencies: 234
-- Data for Name: lda_jornada; Type: TABLE DATA; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMLDA".lda_jornada VALUES (1, 'Media Jornada Mañana', 'Media Jornada Mañana', true, false, NULL, NULL);
INSERT INTO "ADMLDA".lda_jornada VALUES (2, 'Media Jornada Tarde', 'Media Jornada Tarde', true, false, NULL, NULL);
INSERT INTO "ADMLDA".lda_jornada VALUES (4, 'Jornada Tarde con extensión', 'Jornada Tarde con extensión', true, false, NULL, NULL);
INSERT INTO "ADMLDA".lda_jornada VALUES (5, 'Jornada Completa', 'Jornada Completa', true, false, NULL, NULL);
INSERT INTO "ADMLDA".lda_jornada VALUES (3, 'Jornada Mañana con Extensión', 'Jornada Mañana con Extensión', true, false, NULL, NULL);


--
-- TOC entry 3609 (class 0 OID 16392)
-- Dependencies: 217
-- Data for Name: lda_menor; Type: TABLE DATA; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMLDA".lda_menor VALUES (1, true, false, 3, 5, NULL, 1);


--
-- TOC entry 3624 (class 0 OID 16551)
-- Dependencies: 232
-- Data for Name: lda_nivel; Type: TABLE DATA; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMLDA".lda_nivel VALUES (1, 'Medio Menor', 'Nivel Medio Menor', true, false, 1);
INSERT INTO "ADMLDA".lda_nivel VALUES (2, 'Medio Mayor', 'Nivel Medio Mayor', true, false, 2);
INSERT INTO "ADMLDA".lda_nivel VALUES (3, 'Transición Menor y Mayor', 'Nivel Transición Menor y Mayor', true, false, 3);


--
-- TOC entry 3640 (class 0 OID 16736)
-- Dependencies: 248
-- Data for Name: lda_nivel_menor; Type: TABLE DATA; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMLDA".lda_nivel_menor VALUES (1, 1, 1, true, false);


--
-- TOC entry 3646 (class 0 OID 16787)
-- Dependencies: 254
-- Data for Name: lda_paseo; Type: TABLE DATA; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMLDA".lda_paseo VALUES (1, 'Los Manantiales', 'Camping en los Manantiales', 1, true, false, '2024-11-23 10:00:00', '2024-11-24 18:00:00');
INSERT INTO "ADMLDA".lda_paseo VALUES (2, 'Casa de Pablo Neruda', 'Dia en la casa de Pablo Neruda, menores deben llevar su comida.', 2, true, false, '2024-11-26 08:00:00', '2024-11-26 12:00:00');


--
-- TOC entry 3650 (class 0 OID 16831)
-- Dependencies: 258
-- Data for Name: lda_paseo_menor; Type: TABLE DATA; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMLDA".lda_paseo_menor VALUES (1, 1, 1, 1, true);
INSERT INTO "ADMLDA".lda_paseo_menor VALUES (5, 2, 1, 1, true);


--
-- TOC entry 3638 (class 0 OID 16721)
-- Dependencies: 246
-- Data for Name: lda_reunion; Type: TABLE DATA; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMLDA".lda_reunion VALUES (3, 'Menores mal portados', '2024-11-21 19:00:00', 1, true, false);


--
-- TOC entry 3652 (class 0 OID 17395)
-- Dependencies: 260
-- Data for Name: lda_reunion_menor; Type: TABLE DATA; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMLDA".lda_reunion_menor VALUES (1, 3, 1, true, 1);


--
-- TOC entry 3654 (class 0 OID 17425)
-- Dependencies: 262
-- Data for Name: lda_reunion_tema; Type: TABLE DATA; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMLDA".lda_reunion_tema VALUES (5, 3, 'Menores Mal Portados', false);
INSERT INTO "ADMLDA".lda_reunion_tema VALUES (6, 3, 'Próximos Paseos y Salidas', false);
INSERT INTO "ADMLDA".lda_reunion_tema VALUES (8, 3, 'Paseo Fin de Año', false);
INSERT INTO "ADMLDA".lda_reunion_tema VALUES (10, 3, 'Fiesta de Gracuacion', false);
INSERT INTO "ADMLDA".lda_reunion_tema VALUES (7, 3, 'Otro tema', true);
INSERT INTO "ADMLDA".lda_reunion_tema VALUES (11, 3, 'Otro', false);


--
-- TOC entry 3628 (class 0 OID 16584)
-- Dependencies: 236
-- Data for Name: lda_sala; Type: TABLE DATA; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMLDA".lda_sala VALUES (1, 'Violeta Parra', 'Sala Violeta Parra', true, false);
INSERT INTO "ADMLDA".lda_sala VALUES (2, 'Gabriela Mistral', 'Sala Gabriela Mistral', true, false);
INSERT INTO "ADMLDA".lda_sala VALUES (3, 'Elena Caffarena', 'Sala Elena Caffarena', true, false);


--
-- TOC entry 3634 (class 0 OID 16646)
-- Dependencies: 242
-- Data for Name: lda_tipo_comunicado; Type: TABLE DATA; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMLDA".lda_tipo_comunicado VALUES (1, 'Informativo');
INSERT INTO "ADMLDA".lda_tipo_comunicado VALUES (2, 'Petición');
INSERT INTO "ADMLDA".lda_tipo_comunicado VALUES (3, 'Recordatorio');
INSERT INTO "ADMLDA".lda_tipo_comunicado VALUES (4, 'Reunión de Apoderados');


--
-- TOC entry 3648 (class 0 OID 16798)
-- Dependencies: 256
-- Data for Name: lda_tipo_paseo; Type: TABLE DATA; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMLDA".lda_tipo_paseo VALUES (1, 'Paseo');
INSERT INTO "ADMLDA".lda_tipo_paseo VALUES (2, 'Visita');


--
-- TOC entry 3642 (class 0 OID 16760)
-- Dependencies: 250
-- Data for Name: lda_vacuna; Type: TABLE DATA; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMLDA".lda_vacuna VALUES (1, 'Influenza', '2024-11-26', 2024);


--
-- TOC entry 3644 (class 0 OID 16769)
-- Dependencies: 252
-- Data for Name: lda_vacuna_menor; Type: TABLE DATA; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMLDA".lda_vacuna_menor VALUES (1, 1, 1, true);


--
-- TOC entry 3611 (class 0 OID 16400)
-- Dependencies: 219
-- Data for Name: per_nacionalidad; Type: TABLE DATA; Schema: ADMPER; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMPER".per_nacionalidad VALUES (1, 'Chilena', true);
INSERT INTO "ADMPER".per_nacionalidad VALUES (2, 'Otra', true);


--
-- TOC entry 3613 (class 0 OID 16407)
-- Dependencies: 221
-- Data for Name: per_persona; Type: TABLE DATA; Schema: ADMPER; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMPER".per_persona VALUES (1, 'Matías', 'Antonio', 'Leal', 'Tapia', 1, '21307803', '8', NULL, 1, true, false, 'mat.leal@libretadigital.cl', '996451547', 'Moratín 202', NULL, 2);
INSERT INTO "ADMPER".per_persona VALUES (2, 'Josefina', NULL, 'Mirna', 'Perez', 1, '23458260', '7', NULL, 1, true, false, 'mat.leal@duocuc.cl', '+56996451547', '', NULL, 1);
INSERT INTO "ADMPER".per_persona VALUES (5, 'Matias', NULL, 'Ossio', NULL, 1, '11111111', '1', NULL, 1, true, false, NULL, NULL, NULL, NULL, 2);
INSERT INTO "ADMPER".per_persona VALUES (3, 'Joaquín', 'Antonio', 'Marchant', 'Leal', 1, '26890534', '0', NULL, 1, true, false, NULL, NULL, NULL, '2021-05-06', 2);


--
-- TOC entry 3630 (class 0 OID 16620)
-- Dependencies: 238
-- Data for Name: per_sexo; Type: TABLE DATA; Schema: ADMPER; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMPER".per_sexo VALUES (1, 'Femenino', 'F');
INSERT INTO "ADMPER".per_sexo VALUES (2, 'Masculino', 'M');
INSERT INTO "ADMPER".per_sexo VALUES (3, 'Desconocido', '?');


--
-- TOC entry 3615 (class 0 OID 16415)
-- Dependencies: 223
-- Data for Name: per_tipo_identificador; Type: TABLE DATA; Schema: ADMPER; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMPER".per_tipo_identificador VALUES (1, 'RUN', true);
INSERT INTO "ADMPER".per_tipo_identificador VALUES (2, 'DNI', true);


--
-- TOC entry 3617 (class 0 OID 16422)
-- Dependencies: 225
-- Data for Name: usr_rol; Type: TABLE DATA; Schema: ADMUSR; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMUSR".usr_rol VALUES (1, 'admin', true);
INSERT INTO "ADMUSR".usr_rol VALUES (2, 'user', true);
INSERT INTO "ADMUSR".usr_rol VALUES (3, 'educador', true);
INSERT INTO "ADMUSR".usr_rol VALUES (4, 'apoderado', true);
INSERT INTO "ADMUSR".usr_rol VALUES (5, 'director', true);
INSERT INTO "ADMUSR".usr_rol VALUES (6, 'profesor', true);


--
-- TOC entry 3619 (class 0 OID 16434)
-- Dependencies: 227
-- Data for Name: usr_usuario; Type: TABLE DATA; Schema: ADMUSR; Owner: libreta_digital_sql_user
--

INSERT INTO "ADMUSR".usr_usuario VALUES (1, 1, '6081e67d1be75437218f8a27bea0cef21dcf695eeef7892170702ab72bca955f', true, false, 1);
INSERT INTO "ADMUSR".usr_usuario VALUES (3, 5, '6081e67d1be75437218f8a27bea0cef21dcf695eeef7892170702ab72bca955f', true, false, 4);
INSERT INTO "ADMUSR".usr_usuario VALUES (2, 2, '6081e67d1be75437218f8a27bea0cef21dcf695eeef7892170702ab72bca955f', true, false, 3);


--
-- TOC entry 3691 (class 0 OID 0)
-- Dependencies: 243
-- Name: lda_comunicado_elementos_iden_comunicado_elementos_seq; Type: SEQUENCE SET; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMLDA".lda_comunicado_elementos_iden_comunicado_elementos_seq', 1, false);


--
-- TOC entry 3692 (class 0 OID 0)
-- Dependencies: 239
-- Name: lda_comunicado_iden_comunicado_seq; Type: SEQUENCE SET; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMLDA".lda_comunicado_iden_comunicado_seq', 1, false);


--
-- TOC entry 3693 (class 0 OID 0)
-- Dependencies: 229
-- Name: lda_educador_iden_educador_seq; Type: SEQUENCE SET; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMLDA".lda_educador_iden_educador_seq', 1, true);


--
-- TOC entry 3694 (class 0 OID 0)
-- Dependencies: 263
-- Name: lda_itinerario_iden_itinerario_seq; Type: SEQUENCE SET; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMLDA".lda_itinerario_iden_itinerario_seq', 2, true);


--
-- TOC entry 3695 (class 0 OID 0)
-- Dependencies: 265
-- Name: lda_itinerario_menor_iden_itinerario_menor_seq; Type: SEQUENCE SET; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMLDA".lda_itinerario_menor_iden_itinerario_menor_seq', 1, true);


--
-- TOC entry 3696 (class 0 OID 0)
-- Dependencies: 233
-- Name: lda_jornada_iden_jornada_seq; Type: SEQUENCE SET; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMLDA".lda_jornada_iden_jornada_seq', 5, true);


--
-- TOC entry 3697 (class 0 OID 0)
-- Dependencies: 218
-- Name: lda_menor_iden_menor_seq; Type: SEQUENCE SET; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMLDA".lda_menor_iden_menor_seq', 1, false);


--
-- TOC entry 3698 (class 0 OID 0)
-- Dependencies: 231
-- Name: lda_nivel_iden_nivel_seq; Type: SEQUENCE SET; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMLDA".lda_nivel_iden_nivel_seq', 3, true);


--
-- TOC entry 3699 (class 0 OID 0)
-- Dependencies: 247
-- Name: lda_nivel_menor_iden_nivel_menor_seq; Type: SEQUENCE SET; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMLDA".lda_nivel_menor_iden_nivel_menor_seq', 1, true);


--
-- TOC entry 3700 (class 0 OID 0)
-- Dependencies: 253
-- Name: lda_paseo_iden_paseo_seq; Type: SEQUENCE SET; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMLDA".lda_paseo_iden_paseo_seq', 3, true);


--
-- TOC entry 3701 (class 0 OID 0)
-- Dependencies: 257
-- Name: lda_paseo_menor_iden_paseo_menor_seq; Type: SEQUENCE SET; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMLDA".lda_paseo_menor_iden_paseo_menor_seq', 5, true);


--
-- TOC entry 3702 (class 0 OID 0)
-- Dependencies: 255
-- Name: lda_paseo_tipo_iden_tipo_paseo_seq; Type: SEQUENCE SET; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMLDA".lda_paseo_tipo_iden_tipo_paseo_seq', 2, true);


--
-- TOC entry 3703 (class 0 OID 0)
-- Dependencies: 245
-- Name: lda_reunion_iden_reunion_seq; Type: SEQUENCE SET; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMLDA".lda_reunion_iden_reunion_seq', 3, true);


--
-- TOC entry 3704 (class 0 OID 0)
-- Dependencies: 259
-- Name: lda_reunion_menor_iden_reunion_menor_seq; Type: SEQUENCE SET; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMLDA".lda_reunion_menor_iden_reunion_menor_seq', 1, true);


--
-- TOC entry 3705 (class 0 OID 0)
-- Dependencies: 261
-- Name: lda_reunion_tema_iden_reunion_tema_seq; Type: SEQUENCE SET; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMLDA".lda_reunion_tema_iden_reunion_tema_seq', 11, true);


--
-- TOC entry 3706 (class 0 OID 0)
-- Dependencies: 235
-- Name: lda_sala_iden_sala_seq; Type: SEQUENCE SET; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMLDA".lda_sala_iden_sala_seq', 3, true);


--
-- TOC entry 3707 (class 0 OID 0)
-- Dependencies: 241
-- Name: lda_tipo_comunicado_iden_tipo_comunicado_seq; Type: SEQUENCE SET; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMLDA".lda_tipo_comunicado_iden_tipo_comunicado_seq', 4, true);


--
-- TOC entry 3708 (class 0 OID 0)
-- Dependencies: 249
-- Name: lda_vacuna_iden_vacuna_seq; Type: SEQUENCE SET; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMLDA".lda_vacuna_iden_vacuna_seq', 1, true);


--
-- TOC entry 3709 (class 0 OID 0)
-- Dependencies: 251
-- Name: lda_vacuna_menor_iden_vacuna_menor_seq; Type: SEQUENCE SET; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMLDA".lda_vacuna_menor_iden_vacuna_menor_seq', 1, true);


--
-- TOC entry 3710 (class 0 OID 0)
-- Dependencies: 220
-- Name: per_nacionalidad_iden_nacionalidad_seq; Type: SEQUENCE SET; Schema: ADMPER; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMPER".per_nacionalidad_iden_nacionalidad_seq', 2, false);


--
-- TOC entry 3711 (class 0 OID 0)
-- Dependencies: 222
-- Name: per_persona_iden_persona_seq; Type: SEQUENCE SET; Schema: ADMPER; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMPER".per_persona_iden_persona_seq', 4, true);


--
-- TOC entry 3712 (class 0 OID 0)
-- Dependencies: 237
-- Name: per_sexo_iden_sexo_seq; Type: SEQUENCE SET; Schema: ADMPER; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMPER".per_sexo_iden_sexo_seq', 3, true);


--
-- TOC entry 3713 (class 0 OID 0)
-- Dependencies: 224
-- Name: per_tipo_identificador_iden_tipo_identificador_seq; Type: SEQUENCE SET; Schema: ADMPER; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMPER".per_tipo_identificador_iden_tipo_identificador_seq', 2, true);


--
-- TOC entry 3714 (class 0 OID 0)
-- Dependencies: 226
-- Name: usr_rol_iden_rol_seq; Type: SEQUENCE SET; Schema: ADMUSR; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMUSR".usr_rol_iden_rol_seq', 6, true);


--
-- TOC entry 3715 (class 0 OID 0)
-- Dependencies: 228
-- Name: usr_usuario_iden_usuario_seq; Type: SEQUENCE SET; Schema: ADMUSR; Owner: libreta_digital_sql_user
--

SELECT pg_catalog.setval('"ADMUSR".usr_usuario_iden_usuario_seq', 3, true);


--
-- TOC entry 3413 (class 2606 OID 16662)
-- Name: lda_comunicado_menor lda_comunicado_elementos_pk; Type: CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_comunicado_menor
    ADD CONSTRAINT lda_comunicado_elementos_pk PRIMARY KEY (iden_comunicado_elementos);


--
-- TOC entry 3409 (class 2606 OID 16644)
-- Name: lda_comunicado lda_comunicado_pk; Type: CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_comunicado
    ADD CONSTRAINT lda_comunicado_pk PRIMARY KEY (iden_comunicado);


--
-- TOC entry 3399 (class 2606 OID 16505)
-- Name: lda_educador lda_educador_pk; Type: CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_educador
    ADD CONSTRAINT lda_educador_pk PRIMARY KEY (iden_educador);


--
-- TOC entry 3435 (class 2606 OID 17468)
-- Name: lda_itinerario_menor lda_itinerario_menor_pk; Type: CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_itinerario_menor
    ADD CONSTRAINT lda_itinerario_menor_pk PRIMARY KEY (iden_itinerario_menor);


--
-- TOC entry 3433 (class 2606 OID 17455)
-- Name: lda_itinerario lda_itinerario_pk; Type: CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_itinerario
    ADD CONSTRAINT lda_itinerario_pk PRIMARY KEY (iden_itinerario);


--
-- TOC entry 3403 (class 2606 OID 16572)
-- Name: lda_jornada lda_jornada_pk; Type: CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_jornada
    ADD CONSTRAINT lda_jornada_pk PRIMARY KEY (iden_jornada);


--
-- TOC entry 3385 (class 2606 OID 16450)
-- Name: lda_menor lda_menor_pk; Type: CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_menor
    ADD CONSTRAINT lda_menor_pk PRIMARY KEY (iden_menor);


--
-- TOC entry 3417 (class 2606 OID 16743)
-- Name: lda_nivel_menor lda_nivel_menor_pk; Type: CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_nivel_menor
    ADD CONSTRAINT lda_nivel_menor_pk PRIMARY KEY (iden_nivel_menor);


--
-- TOC entry 3401 (class 2606 OID 16560)
-- Name: lda_nivel lda_nivel_pk; Type: CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_nivel
    ADD CONSTRAINT lda_nivel_pk PRIMARY KEY (iden_nivel);


--
-- TOC entry 3427 (class 2606 OID 16840)
-- Name: lda_paseo_menor lda_paseo_menor_pk; Type: CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_paseo_menor
    ADD CONSTRAINT lda_paseo_menor_pk PRIMARY KEY (iden_paseo_menor);


--
-- TOC entry 3423 (class 2606 OID 16796)
-- Name: lda_paseo lda_paseo_pk; Type: CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_paseo
    ADD CONSTRAINT lda_paseo_pk PRIMARY KEY (iden_paseo);


--
-- TOC entry 3425 (class 2606 OID 16805)
-- Name: lda_tipo_paseo lda_paseo_tipo_pk; Type: CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_tipo_paseo
    ADD CONSTRAINT lda_paseo_tipo_pk PRIMARY KEY (iden_tipo_paseo);


--
-- TOC entry 3429 (class 2606 OID 17403)
-- Name: lda_reunion_menor lda_reunion_menor_pk; Type: CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_reunion_menor
    ADD CONSTRAINT lda_reunion_menor_pk PRIMARY KEY (iden_reunion_menor);


--
-- TOC entry 3415 (class 2606 OID 16728)
-- Name: lda_reunion lda_reunion_pk; Type: CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_reunion
    ADD CONSTRAINT lda_reunion_pk PRIMARY KEY (iden_reunion);


--
-- TOC entry 3431 (class 2606 OID 17433)
-- Name: lda_reunion_tema lda_reunion_tema_pk; Type: CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_reunion_tema
    ADD CONSTRAINT lda_reunion_tema_pk PRIMARY KEY (iden_reunion_tema);


--
-- TOC entry 3405 (class 2606 OID 16593)
-- Name: lda_sala lda_sala_pk; Type: CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_sala
    ADD CONSTRAINT lda_sala_pk PRIMARY KEY (iden_sala);


--
-- TOC entry 3411 (class 2606 OID 16653)
-- Name: lda_tipo_comunicado lda_tipo_comunicado_pk; Type: CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_tipo_comunicado
    ADD CONSTRAINT lda_tipo_comunicado_pk PRIMARY KEY (iden_tipo_comunicado);


--
-- TOC entry 3421 (class 2606 OID 16775)
-- Name: lda_vacuna_menor lda_vacuna_menor_pk; Type: CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_vacuna_menor
    ADD CONSTRAINT lda_vacuna_menor_pk PRIMARY KEY (iden_vacuna_menor);


--
-- TOC entry 3419 (class 2606 OID 16767)
-- Name: lda_vacuna lda_vacuna_pk; Type: CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_vacuna
    ADD CONSTRAINT lda_vacuna_pk PRIMARY KEY (iden_vacuna);


--
-- TOC entry 3387 (class 2606 OID 16452)
-- Name: per_nacionalidad per_nacionalidad_pk; Type: CONSTRAINT; Schema: ADMPER; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMPER".per_nacionalidad
    ADD CONSTRAINT per_nacionalidad_pk PRIMARY KEY (iden_nacionalidad);


--
-- TOC entry 3389 (class 2606 OID 16454)
-- Name: per_persona per_persona_pk; Type: CONSTRAINT; Schema: ADMPER; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMPER".per_persona
    ADD CONSTRAINT per_persona_pk PRIMARY KEY (iden_persona);


--
-- TOC entry 3391 (class 2606 OID 16456)
-- Name: per_persona per_persona_unique; Type: CONSTRAINT; Schema: ADMPER; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMPER".per_persona
    ADD CONSTRAINT per_persona_unique UNIQUE (desc_run);


--
-- TOC entry 3407 (class 2606 OID 16627)
-- Name: per_sexo per_sexo_pk; Type: CONSTRAINT; Schema: ADMPER; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMPER".per_sexo
    ADD CONSTRAINT per_sexo_pk PRIMARY KEY (iden_sexo);


--
-- TOC entry 3393 (class 2606 OID 16458)
-- Name: per_tipo_identificador per_tipo_identificador_pk; Type: CONSTRAINT; Schema: ADMPER; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMPER".per_tipo_identificador
    ADD CONSTRAINT per_tipo_identificador_pk PRIMARY KEY (iden_tipo_identificador);


--
-- TOC entry 3395 (class 2606 OID 16460)
-- Name: usr_rol usr_rol_pk; Type: CONSTRAINT; Schema: ADMUSR; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMUSR".usr_rol
    ADD CONSTRAINT usr_rol_pk PRIMARY KEY (iden_rol);


--
-- TOC entry 3397 (class 2606 OID 16464)
-- Name: usr_usuario usr_usuario_pk; Type: CONSTRAINT; Schema: ADMUSR; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMUSR".usr_usuario
    ADD CONSTRAINT usr_usuario_pk PRIMARY KEY (iden_usuario);


--
-- TOC entry 3447 (class 2606 OID 16663)
-- Name: lda_comunicado_menor lda_comunicado_elementos_lda_comunicado_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_comunicado_menor
    ADD CONSTRAINT lda_comunicado_elementos_lda_comunicado_fk FOREIGN KEY (iden_comunicado) REFERENCES "ADMLDA".lda_comunicado(iden_comunicado);


--
-- TOC entry 3448 (class 2606 OID 16678)
-- Name: lda_comunicado_menor lda_comunicado_elementos_lda_educador_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_comunicado_menor
    ADD CONSTRAINT lda_comunicado_elementos_lda_educador_fk FOREIGN KEY (iden_educador) REFERENCES "ADMLDA".lda_educador(iden_educador);


--
-- TOC entry 3449 (class 2606 OID 16673)
-- Name: lda_comunicado_menor lda_comunicado_elementos_lda_menor_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_comunicado_menor
    ADD CONSTRAINT lda_comunicado_elementos_lda_menor_fk FOREIGN KEY (iden_menor) REFERENCES "ADMLDA".lda_menor(iden_menor);


--
-- TOC entry 3445 (class 2606 OID 16506)
-- Name: lda_educador lda_educador_per_persona_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_educador
    ADD CONSTRAINT lda_educador_per_persona_fk FOREIGN KEY (iden_persona) REFERENCES "ADMPER".per_persona(iden_persona);


--
-- TOC entry 3464 (class 2606 OID 17474)
-- Name: lda_itinerario_menor lda_itinerario_menor_lda_itinerario_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_itinerario_menor
    ADD CONSTRAINT lda_itinerario_menor_lda_itinerario_fk FOREIGN KEY (iden_itinerario) REFERENCES "ADMLDA".lda_itinerario(iden_itinerario);


--
-- TOC entry 3465 (class 2606 OID 17469)
-- Name: lda_itinerario_menor lda_itinerario_menor_lda_menor_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_itinerario_menor
    ADD CONSTRAINT lda_itinerario_menor_lda_menor_fk FOREIGN KEY (iden_menor) REFERENCES "ADMLDA".lda_menor(iden_menor);


--
-- TOC entry 3466 (class 2606 OID 17480)
-- Name: lda_itinerario_menor lda_itinerario_menor_lda_nivel_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_itinerario_menor
    ADD CONSTRAINT lda_itinerario_menor_lda_nivel_fk FOREIGN KEY (iden_nivel) REFERENCES "ADMLDA".lda_nivel(iden_nivel);


--
-- TOC entry 3463 (class 2606 OID 17456)
-- Name: lda_itinerario lda_itinerario_usr_usuario_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_itinerario
    ADD CONSTRAINT lda_itinerario_usr_usuario_fk FOREIGN KEY (iden_usr_creador) REFERENCES "ADMUSR".usr_usuario(iden_usuario);


--
-- TOC entry 3436 (class 2606 OID 16714)
-- Name: lda_menor lda_menor_lda_jornada_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_menor
    ADD CONSTRAINT lda_menor_lda_jornada_fk FOREIGN KEY (iden_jornada) REFERENCES "ADMLDA".lda_jornada(iden_jornada);


--
-- TOC entry 3437 (class 2606 OID 16511)
-- Name: lda_menor lda_menor_per_persona_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_menor
    ADD CONSTRAINT lda_menor_per_persona_fk FOREIGN KEY (iden_persona) REFERENCES "ADMPER".per_persona(iden_persona);


--
-- TOC entry 3438 (class 2606 OID 16703)
-- Name: lda_menor lda_menor_per_persona_fk_1; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_menor
    ADD CONSTRAINT lda_menor_per_persona_fk_1 FOREIGN KEY (iden_per_apoderado) REFERENCES "ADMPER".per_persona(iden_persona);


--
-- TOC entry 3439 (class 2606 OID 16708)
-- Name: lda_menor lda_menor_per_persona_fk_2; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_menor
    ADD CONSTRAINT lda_menor_per_persona_fk_2 FOREIGN KEY (iden_per_apoderado_sup) REFERENCES "ADMPER".per_persona(iden_persona);


--
-- TOC entry 3446 (class 2606 OID 16594)
-- Name: lda_nivel lda_nivel_lda_sala_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_nivel
    ADD CONSTRAINT lda_nivel_lda_sala_fk FOREIGN KEY (iden_sala) REFERENCES "ADMLDA".lda_sala(iden_sala);


--
-- TOC entry 3451 (class 2606 OID 16744)
-- Name: lda_nivel_menor lda_nivel_menor_lda_menor_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_nivel_menor
    ADD CONSTRAINT lda_nivel_menor_lda_menor_fk FOREIGN KEY (iden_menor) REFERENCES "ADMLDA".lda_menor(iden_menor);


--
-- TOC entry 3452 (class 2606 OID 16749)
-- Name: lda_nivel_menor lda_nivel_menor_lda_nivel_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_nivel_menor
    ADD CONSTRAINT lda_nivel_menor_lda_nivel_fk FOREIGN KEY (iden_nivel) REFERENCES "ADMLDA".lda_nivel(iden_nivel);


--
-- TOC entry 3455 (class 2606 OID 16806)
-- Name: lda_paseo lda_paseo_lda_tipo_paseo_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_paseo
    ADD CONSTRAINT lda_paseo_lda_tipo_paseo_fk FOREIGN KEY (iden_tipo_paseo) REFERENCES "ADMLDA".lda_tipo_paseo(iden_tipo_paseo);


--
-- TOC entry 3456 (class 2606 OID 16846)
-- Name: lda_paseo_menor lda_paseo_menor_lda_menor_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_paseo_menor
    ADD CONSTRAINT lda_paseo_menor_lda_menor_fk FOREIGN KEY (iden_menor) REFERENCES "ADMLDA".lda_menor(iden_menor);


--
-- TOC entry 3457 (class 2606 OID 16855)
-- Name: lda_paseo_menor lda_paseo_menor_lda_nivel_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_paseo_menor
    ADD CONSTRAINT lda_paseo_menor_lda_nivel_fk FOREIGN KEY (iden_nivel) REFERENCES "ADMLDA".lda_nivel(iden_nivel);


--
-- TOC entry 3458 (class 2606 OID 16841)
-- Name: lda_paseo_menor lda_paseo_menor_lda_paseo_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_paseo_menor
    ADD CONSTRAINT lda_paseo_menor_lda_paseo_fk FOREIGN KEY (iden_paseo) REFERENCES "ADMLDA".lda_paseo(iden_paseo);


--
-- TOC entry 3450 (class 2606 OID 17389)
-- Name: lda_reunion lda_reunion_lda_sala_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_reunion
    ADD CONSTRAINT lda_reunion_lda_sala_fk FOREIGN KEY (iden_sala) REFERENCES "ADMLDA".lda_sala(iden_sala);


--
-- TOC entry 3459 (class 2606 OID 17409)
-- Name: lda_reunion_menor lda_reunion_menor_lda_menor_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_reunion_menor
    ADD CONSTRAINT lda_reunion_menor_lda_menor_fk FOREIGN KEY (iden_menor) REFERENCES "ADMLDA".lda_menor(iden_menor);


--
-- TOC entry 3460 (class 2606 OID 17414)
-- Name: lda_reunion_menor lda_reunion_menor_lda_nivel_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_reunion_menor
    ADD CONSTRAINT lda_reunion_menor_lda_nivel_fk FOREIGN KEY (iden_nivel) REFERENCES "ADMLDA".lda_nivel(iden_nivel);


--
-- TOC entry 3461 (class 2606 OID 17404)
-- Name: lda_reunion_menor lda_reunion_menor_lda_reunion_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_reunion_menor
    ADD CONSTRAINT lda_reunion_menor_lda_reunion_fk FOREIGN KEY (iden_reunion) REFERENCES "ADMLDA".lda_reunion(iden_reunion);


--
-- TOC entry 3462 (class 2606 OID 17434)
-- Name: lda_reunion_tema lda_reunion_tema_lda_reunion_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_reunion_tema
    ADD CONSTRAINT lda_reunion_tema_lda_reunion_fk FOREIGN KEY (iden_reunion) REFERENCES "ADMLDA".lda_reunion(iden_reunion);


--
-- TOC entry 3453 (class 2606 OID 16776)
-- Name: lda_vacuna_menor lda_vacuna_menor_lda_menor_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_vacuna_menor
    ADD CONSTRAINT lda_vacuna_menor_lda_menor_fk FOREIGN KEY (iden_menor) REFERENCES "ADMLDA".lda_menor(iden_menor);


--
-- TOC entry 3454 (class 2606 OID 16781)
-- Name: lda_vacuna_menor lda_vacuna_menor_lda_vacuna_fk; Type: FK CONSTRAINT; Schema: ADMLDA; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMLDA".lda_vacuna_menor
    ADD CONSTRAINT lda_vacuna_menor_lda_vacuna_fk FOREIGN KEY (iden_vacuna) REFERENCES "ADMLDA".lda_vacuna(iden_vacuna);


--
-- TOC entry 3440 (class 2606 OID 16465)
-- Name: per_persona per_persona_per_nacionalidad_fk; Type: FK CONSTRAINT; Schema: ADMPER; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMPER".per_persona
    ADD CONSTRAINT per_persona_per_nacionalidad_fk FOREIGN KEY (iden_nacionalidad) REFERENCES "ADMPER".per_nacionalidad(iden_nacionalidad);


--
-- TOC entry 3441 (class 2606 OID 16628)
-- Name: per_persona per_persona_per_sexo_fk; Type: FK CONSTRAINT; Schema: ADMPER; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMPER".per_persona
    ADD CONSTRAINT per_persona_per_sexo_fk FOREIGN KEY (iden_sexo) REFERENCES "ADMPER".per_sexo(iden_sexo);


--
-- TOC entry 3442 (class 2606 OID 16470)
-- Name: per_persona per_persona_per_tipo_identificador_fk; Type: FK CONSTRAINT; Schema: ADMPER; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMPER".per_persona
    ADD CONSTRAINT per_persona_per_tipo_identificador_fk FOREIGN KEY (iden_tipo_identificador) REFERENCES "ADMPER".per_tipo_identificador(iden_tipo_identificador);


--
-- TOC entry 3443 (class 2606 OID 16485)
-- Name: usr_usuario usr_usuario_per_persona_fk; Type: FK CONSTRAINT; Schema: ADMUSR; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMUSR".usr_usuario
    ADD CONSTRAINT usr_usuario_per_persona_fk FOREIGN KEY (iden_persona) REFERENCES "ADMPER".per_persona(iden_persona);


--
-- TOC entry 3444 (class 2606 OID 16754)
-- Name: usr_usuario usr_usuario_usr_rol_fk; Type: FK CONSTRAINT; Schema: ADMUSR; Owner: libreta_digital_sql_user
--

ALTER TABLE ONLY "ADMUSR".usr_usuario
    ADD CONSTRAINT usr_usuario_usr_rol_fk FOREIGN KEY (iden_rol) REFERENCES "ADMUSR".usr_rol(iden_rol);


-- Completed on 2024-11-20 22:31:27

--
-- PostgreSQL database dump complete
--

