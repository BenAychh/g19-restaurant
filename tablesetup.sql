CREATE TABLE public.restaurants
(
  name character varying,
  image character varying,
  city character varying,
  state character varying,
  rating double precision,
  description character varying,
  id serial,
  cuisine_id integer,
  CONSTRAINT restaurants_cuisine_id_fkey FOREIGN KEY (cuisine_id)
      REFERENCES public.cuisines (id) MATCH SIMPLE
)
WITH (
  OIDS=FALSE
);

CREATE TABLE public.cuisines
(
  id serial,
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
