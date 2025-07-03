# ✅ Mapa de Requisitos – Backend

## 📌 Requisitos Funcionais (RF)

| Código  | Descrição                                                                                                                        | Status |
|---------|----------------------------------------------------------------------------------------------------------------------------------|:------:|
| RF01    | Permitir o cadastro de produtores rurais com nome e CPF ou CNPJ válidos.                                                        |   ✅   |
| RF02    | Permitir a edição de dados de produtores já cadastrados.                                                                        |   ✅   |
| RF03    | Permitir a exclusão de produtores.                                                                                              |   ✅   |
| RF04    | Permitir o cadastro de propriedades (fazendas) associadas a um produtor.                                                        |   ✅   |
| RF05    | Validar que a soma de áreas agricultável e vegetação não ultrapasse a área total da fazenda.                                    |   ✅   |
| RF06    | Permitir a edição e exclusão de propriedades.                                                                                   |   ✅   |
| RF07    | Permitir o registro de culturas por propriedade, safra e nome da cultura.                                                       |   ✅   |
| RF08    | Permitir o cadastro de novas safras (ex: 2021, 2022...).                                                                        |   ✅   |
| RF09    | Permitir a consulta detalhada de produtores, com suas fazendas, safras e culturas.                                              |   ✅   |
| RF10    | Exibir dashboard com dados agregados: quantidade de fazendas, soma total de hectares, gráficos de pizza por estado, cultura e uso do solo. |   ✅   |
| RF11    | Validar o formato e autenticidade de CPF/CNPJ (ex: com lib cpf-cnpj-validator).                                                 |   ✅   |
| RF12    | Implementar logs estruturados para rastrear requisições e operações importantes.                                                |   ✅   |
| RF13    | Disponibilizar a documentação da API REST (OpenAPI/Swagger).                                                                    |   ✅   |
| RF14    | Implementar testes unitários e de integração para os módulos principais da aplicação.                                           |   ✅   |

---

## 📌 Requisitos Não Funcionais (RNF)

| Código  | Descrição                                                                                                                        | Status |
|---------|----------------------------------------------------------------------------------------------------------------------------------|:------:|
| RNF01   | A API deve ser desenvolvida com NestJS e escrita em TypeScript.                                                                  |   ✅   |
| RNF02   | Utilizar o PostgreSQL como banco de dados relacional.                                                                           |   ✅   |
| RNF03   | Utilizar um ORM robusto como Prisma ou TypeORM.                                                                                  |   ✅   |
| RNF04   | A aplicação deve ser containerizada com Docker, com ambientes separados para produção e desenvolvimento.                         |   ⬜   |
| RNF05   | A API deve seguir a arquitetura RESTful e estar estruturada em camadas.                                                         |   ✅   |
| RNF06   | O código deve seguir princípios de Clean Code, SOLID, e manter-se testável e escalável.                                          |   ✅   |
| RNF07   | A API deve expor mensagens de erro amigáveis e padronizadas, com status HTTP apropriados.                                       |   ✅   |
| RNF08   | As requisições e respostas devem seguir um contrato claro (DTOs) e, preferencialmente, utilizar validação com decorators (class-validator). |   ✅   |
| RNF09   | As operações devem ser idempotentes onde aplicável (ex: PUT e DELETE).                                                          |   ✅   |
| RNF10   | A aplicação deve ser documentada com README, e conter instruções de execução local, testes e deploy.                             |   ✅   |
| RNF11   | As rotas devem ser versionadas (/api/v1/) para garantir estabilidade em futuras atualizações.                                    |   ✅   |

---

**Legenda:**
- ✅ Implementado
- ⬜ Não implementado

