--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: promethium
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO promethium;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: promethium
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: characteristic_reviews; Type: TABLE; Schema: public; Owner: promethium
--

CREATE TABLE public.characteristic_reviews (
    id integer NOT NULL,
    characteristic_id integer NOT NULL,
    review_id integer NOT NULL,
    value integer NOT NULL
);


ALTER TABLE public.characteristic_reviews OWNER TO promethium;

--
-- Name: characteristic_reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: promethium
--

CREATE SEQUENCE public.characteristic_reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.characteristic_reviews_id_seq OWNER TO promethium;

--
-- Name: characteristic_reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: promethium
--

ALTER SEQUENCE public.characteristic_reviews_id_seq OWNED BY public.characteristic_reviews.id;


--
-- Name: characteristics; Type: TABLE; Schema: public; Owner: promethium
--

CREATE TABLE public.characteristics (
    id integer NOT NULL,
    product_id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.characteristics OWNER TO promethium;

--
-- Name: characteristics_id_seq; Type: SEQUENCE; Schema: public; Owner: promethium
--

CREATE SEQUENCE public.characteristics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.characteristics_id_seq OWNER TO promethium;

--
-- Name: characteristics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: promethium
--

ALTER SEQUENCE public.characteristics_id_seq OWNED BY public.characteristics.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: promethium
--

CREATE TABLE public.products (
    id integer NOT NULL
);


ALTER TABLE public.products OWNER TO promethium;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: promethium
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO promethium;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: promethium
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: promethium
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    product_id integer NOT NULL,
    rating integer NOT NULL,
    date bigint DEFAULT ((EXTRACT(epoch FROM now()) * (1000)::numeric))::bigint NOT NULL,
    summary character varying NOT NULL,
    body character varying NOT NULL,
    recommend boolean NOT NULL,
    reported boolean DEFAULT false NOT NULL,
    reviewer_name character varying NOT NULL,
    reviewer_email character varying NOT NULL,
    response character varying,
    helpfulness integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.reviews OWNER TO promethium;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: promethium
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO promethium;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: promethium
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: reviews_photos; Type: TABLE; Schema: public; Owner: promethium
--

CREATE TABLE public.reviews_photos (
    id integer NOT NULL,
    review_id integer NOT NULL,
    url character varying NOT NULL
);


ALTER TABLE public.reviews_photos OWNER TO promethium;

--
-- Name: reviews_photos_id_seq; Type: SEQUENCE; Schema: public; Owner: promethium
--

CREATE SEQUENCE public.reviews_photos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_photos_id_seq OWNER TO promethium;

--
-- Name: reviews_photos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: promethium
--

ALTER SEQUENCE public.reviews_photos_id_seq OWNED BY public.reviews_photos.id;


--
-- Name: characteristic_reviews id; Type: DEFAULT; Schema: public; Owner: promethium
--

ALTER TABLE ONLY public.characteristic_reviews ALTER COLUMN id SET DEFAULT nextval('public.characteristic_reviews_id_seq'::regclass);


--
-- Name: characteristics id; Type: DEFAULT; Schema: public; Owner: promethium
--

ALTER TABLE ONLY public.characteristics ALTER COLUMN id SET DEFAULT nextval('public.characteristics_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: promethium
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: promethium
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: reviews_photos id; Type: DEFAULT; Schema: public; Owner: promethium
--

ALTER TABLE ONLY public.reviews_photos ALTER COLUMN id SET DEFAULT nextval('public.reviews_photos_id_seq'::regclass);


--
-- Name: characteristic_reviews characteristic_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: promethium
--

ALTER TABLE ONLY public.characteristic_reviews
    ADD CONSTRAINT characteristic_reviews_pkey PRIMARY KEY (id);


--
-- Name: characteristics characteristics_pkey; Type: CONSTRAINT; Schema: public; Owner: promethium
--

ALTER TABLE ONLY public.characteristics
    ADD CONSTRAINT characteristics_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: promethium
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: reviews_photos reviews_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: promethium
--

ALTER TABLE ONLY public.reviews_photos
    ADD CONSTRAINT reviews_photos_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: promethium
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: characteristics_product_id; Type: INDEX; Schema: public; Owner: promethium
--

CREATE INDEX characteristics_product_id ON public.characteristics USING btree (product_id);


--
-- Name: cr_characteristic_id; Type: INDEX; Schema: public; Owner: promethium
--

CREATE INDEX cr_characteristic_id ON public.characteristic_reviews USING btree (characteristic_id);


--
-- Name: reviews_photos_review_id; Type: INDEX; Schema: public; Owner: promethium
--

CREATE INDEX reviews_photos_review_id ON public.reviews_photos USING btree (review_id);


--
-- Name: reviews_product_id; Type: INDEX; Schema: public; Owner: promethium
--

CREATE INDEX reviews_product_id ON public.reviews USING btree (product_id);


--
-- Name: characteristic_reviews characteristic_id; Type: FK CONSTRAINT; Schema: public; Owner: promethium
--

ALTER TABLE ONLY public.characteristic_reviews
    ADD CONSTRAINT characteristic_id FOREIGN KEY (characteristic_id) REFERENCES public.characteristics(id);


--
-- Name: reviews product_id; Type: FK CONSTRAINT; Schema: public; Owner: promethium
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: characteristics product_id; Type: FK CONSTRAINT; Schema: public; Owner: promethium
--

ALTER TABLE ONLY public.characteristics
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: characteristic_reviews review_id; Type: FK CONSTRAINT; Schema: public; Owner: promethium
--

ALTER TABLE ONLY public.characteristic_reviews
    ADD CONSTRAINT review_id FOREIGN KEY (review_id) REFERENCES public.reviews(id);


--
-- Name: reviews_photos review_id; Type: FK CONSTRAINT; Schema: public; Owner: promethium
--

ALTER TABLE ONLY public.reviews_photos
    ADD CONSTRAINT review_id FOREIGN KEY (review_id) REFERENCES public.reviews(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: promethium
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

