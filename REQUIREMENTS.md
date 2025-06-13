✅ Mapa de Requisitos – Backend

📌 Requisitos Funcionais (RF)

     Código	Descrição
[x] - RF01	Permitir o cadastro de produtores rurais com nome e CPF ou CNPJ válidos. 
[x] - RF02	Permitir a edição de dados de produtores já cadastrados.
[x] - RF03	Permitir a exclusão de produtores.
[x] - RF04	Permitir o cadastro de propriedades (fazendas) associadas a um produtor.
[x] - RF05	Validar que a soma de áreas agricultável e vegetação não ultrapasse a área total da fazenda.
[x] - RF06	Permitir a edição e exclusão de propriedades.
[x] - RF07	Permitir o registro de culturas por propriedade, safra e nome da cultura.
[x] - RF08	Permitir o cadastro de novas safras (ex: 2021, 2022...).
[] - RF09	Permitir a consulta detalhada de produtores, com suas fazendas, safras e culturas.
[] - RF10	Exibir dashboard com dados agregados:
    - Quantidade de fazendas
    - Soma total de hectares
    - Gráficos de pizza por estado, por cultura, e por uso do solo.
[x] - RF11	Validar o formato e autenticidade de CPF/CNPJ (ex: com lib cpf-cnpj-validator).
[x] - RF12	Implementar logs estruturados para rastrear requisições e operações importantes.
[x] - RF13	Disponibilizar a documentação da API REST (OpenAPI/Swagger).
[x] - RF14	Implementar testes unitários e de integração para os módulos principais da aplicação.

📌 Requisitos Não Funcionais (RNF)

     Código	Descrição
[x] - RNF01	A API deve ser desenvolvida com NestJS e escrita em TypeScript.
[x] - RNF02	Utilizar o PostgreSQL como banco de dados relacional.
[x] - RNF03	Utilizar um ORM robusto como Prisma ou TypeORM.
[] - RNF04	A aplicação deve ser containerizada com Docker, com ambientes separados para produção e desenvolvimento.
[x] - RNF05	A API deve seguir a arquitetura RESTful e estar estruturada em camadas.
[x] - RNF06	O código deve seguir princípios de Clean Code, SOLID, e manter-se testável e escalável.
[x] - RNF07	A API deve expor mensagens de erro amigáveis e padronizadas, com status HTTP apropriados.
[x] - RNF08	As requisições e respostas devem seguir um contrato claro (DTOs) e, preferencialmente, utilizar validação com decorators (class-validator).
[x] - RNF09	As operações devem ser idempotentes onde aplicável (ex: PUT e DELETE).
[] - RNF10	A aplicação deve incluir métricas básicas de observabilidade, como logs, erros e tempos de resposta.
[] - RNF11	A aplicação deve ser documentada com README, e conter instruções de execução local, testes e deploy.
[] - RNF12	O sistema deve permitir carga de dados em larga escala sem perda de performance, principalmente nos endpoints de dashboard e listagem.
[] - RNF13	As rotas devem ser versionadas (/api/v1/) para garantir estabilidade em futuras atualizações.

