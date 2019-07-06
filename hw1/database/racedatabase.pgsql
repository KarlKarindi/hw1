--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3
-- Dumped by pg_dump version 11.3

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

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: athletes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.athletes (
    id integer NOT NULL,
    firstname character varying(50) NOT NULL,
    secondname character varying(50),
    startingnumber integer NOT NULL
);


ALTER TABLE public.athletes OWNER TO postgres;

--
-- Name: athletes_startingNumber_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.athletes ALTER COLUMN startingnumber ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."athletes_startingNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: results; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.results (
    athleteid text,
    timingpointid text,
    "time" text
);


ALTER TABLE public.results OWNER TO postgres;

--
-- Data for Name: athletes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.athletes (id, firstname, secondname, startingnumber) FROM stdin;
1	Karl Erik	Karindi	1
2	Qwik	Speederson	2
3	Bobby	Slowman	3
4	Ligt	McQueen	4
5	Ronnie	Mann	5
6	Eddie	Spitfire	6
7	Bob	Normal	7
8	Lol	Lollerson	8
9	Name	McNamerson	9
10	Whoopy	Goopy	10
11	Gus	Larry	11
12	Runny	McRunFace	12
\.


--
-- Data for Name: results; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.results (athleteid, timingpointid, "time") FROM stdin;
10	0	00:07:20
8	0	00:07:20
2	0	00:07:37
6	0	00:08:06
1	0	00:08:30
5	0	00:08:85
7	0	00:09:70
3	0	00:10:40
9	0	00:10:82
12	0	00:11:59
11	0	00:11:75
4	0	00:11:77
10	1	00:12:00
1	1	00:14:40
9	1	00:14:81
4	1	00:14:84
11	1	00:15:33
6	1	00:16:13
5	1	00:17:47
12	1	00:17:82
2	1	00:19:74
8	1	00:20:07
7	1	00:20:11
\.


--
-- Name: athletes_startingNumber_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."athletes_startingNumber_seq"', 12, true);


--
-- Name: athletes athletes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.athletes
    ADD CONSTRAINT athletes_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

