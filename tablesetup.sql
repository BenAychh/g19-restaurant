CREATE TABLE public.restaurants
(
  name character varying,
  image character varying,
  city character varying,
  state character varying,
  rating double precision,
  description character varying,
  id integer NOT NULL DEFAULT nextval('restaurants_id_seq'::regclass),
  cuisine_id integer,
  CONSTRAINT restaurants_cuisine_id_fkey FOREIGN KEY (cuisine_id)
      REFERENCES public.cuisines (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);

CREATE TABLE public.cuisines
(
  id integer NOT NULL DEFAULT nextval('cuisines_id_seq'::regclass),
  name character varying,
  CONSTRAINT cuisines_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=TRUE
);

CREATE TABLE public.reviews
(
   text character varying,
   created_date timestamp with time zone,
   modified_date timestamp with time zone,
   restaurant_id integer,
   id serial
)
WITH (
  OIDS = FALSE
)
;
