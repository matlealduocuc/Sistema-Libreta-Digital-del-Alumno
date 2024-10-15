INSERT INTO "ADMLDA".lda_menor VALUES (1, 'Matías', 'Leal', 'Tapia', '2003-05-28');
INSERT INTO "ADMPER".per_tipo_identificador VALUES (1, 'RUN');
INSERT INTO "ADMPER".per_tipo_identificador VALUES (2, 'DNI');
INSERT INTO "ADMPER".per_nacionalidad VALUES (1, 'Chilena');
INSERT INTO "ADMPER".per_nacionalidad VALUES (2, 'Otra');
INSERT INTO "ADMPER".per_persona VALUES (1, 'Matías', 'Antonio', 'Leal', 'Tapia', 1, '21307803', '8', NULL, 1);
INSERT INTO "ADMUSR".usr_usuario VALUES (1, 1, '1234');

SELECT pg_catalog.setval('"ADMLDA".lda_menor_iden_menor_seq', 1, true);
SELECT pg_catalog.setval('"ADMPER".per_nacionalidad_iden_nacionalidad_seq', 2, false);
SELECT pg_catalog.setval('"ADMPER".per_persona_iden_persona_seq', 1, false);
SELECT pg_catalog.setval('"ADMPER".per_tipo_identificador_iden_tipo_identificador_seq', 2, true);
SELECT pg_catalog.setval('"ADMUSR".usr_usuario_iden_usuario_seq', 1, false);