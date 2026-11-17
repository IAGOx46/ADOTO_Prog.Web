# PROPOSTA DE PROJETO – ADOTÔ

**Nome do projeto:** Adotô – Plataforma de Divulgação de Animais para Adoção.

### 1. Escopo do projeto

O Adotô será uma aplicação web desenvolvida com o objetivo de facilitar a divulgação de animais disponíveis para adoção, conectando pessoas que desejam encontrar um novo lar para seus animais com pessoas interessadas em adotá-los.

A plataforma permitirá que usuários cadastrados publiquem anúncios com informações, descrições e fotografias dos animais. Os interessados poderão visualizar as publicações e entrar em contato diretamente com os anunciantes por meio do WhatsApp, sem necessidade de solicitações ou processos de adoção dentro do sistema.

O anunciante também poderá gerenciar suas publicações, editar informações e desativar anúncios quando o animal for adotado, mantendo o registro armazenado no banco de dados.

### 2. Público-alvo

O sistema será direcionado a pessoas que desejam disponibilizar animais para adoção, protetores independentes, organizações de proteção animal e pessoas interessadas em adotar um animal de estimação.

Qualquer usuário poderá atuar tanto como anunciante quanto como interessado, utilizando uma única conta na plataforma.

### 3. Funcionalidades principais

- Cadastro, login e autenticação de usuários.
- Publicação de anúncios de animais com múltiplas fotografias.
- Cadastro de informações como nome, espécie, raça, idade, sexo, porte e descrição.
- Consulta e visualização dos animais disponíveis.
- Pesquisa e filtragem de anúncios.
- Visualização dos detalhes de cada animal.
- Contato direto com o anunciante por meio do WhatsApp.
- Gerenciamento dos próprios anúncios.
- Edição, desativação e reativação de publicações.
- Ocultação automática de anúncios desativados nas pesquisas públicas.

### 4. Stack tecnológica

- **HTML:** estrutura das páginas.
- **CSS:** estilização e responsividade.
- **JavaScript:** interações do front-end.
- **Node.js:** ambiente de execução do back-end.
- **Express.js:** construção da API.
- **PostgreSQL:** armazenamento dos dados.
- **SQL:** estruturação do banco de dados.
- **JWT:** autenticação dos usuários.
- **Bcrypt:** proteção das senhas.

### 5. Objetivo geral

Desenvolver uma plataforma web simples, acessível e funcional que facilite a divulgação de animais para adoção, aproximando anunciantes e interessados por meio de um ambiente digital organizado e de fácil utilização.

# IMPLEMENTAÇÃO
### 1. Visão geral
O Adotô será uma aplicação web na qual pessoas poderão divulgar animais que precisam de um novo lar e encontrar animais disponíveis para adoção.

A plataforma permitirá que qualquer usuário cadastrado assuma dois papéis, sem precisar escolher um tipo de conta:
- Anunciante: publica e gerencia anúncios de animais.
- Interessado: pesquisa os anúncios e entra em contato com o anunciante.
Esses papéis não são categorias fixas. O mesmo usuário poderá anunciar um animal e, em outro momento, procurar um animal para adotar.

### 2. Requisitos funcionais
Os requisitos funcionais descrevem o que o sistema deverá fazer.
Código	Requisito
RF01	Permitir cadastro de usuários.
RF02	Permitir login e logout.
RF03	Permitir edição dos dados da conta.
RF04	Exibir anúncios de animais disponíveis.
RF05	Permitir pesquisar animais.
RF06	Permitir filtrar por espécie, sexo e localização.
RF07	Exibir detalhes completos do animal.
RF08	Permitir cadastrar anúncios com várias fotos.
RF09	Permitir editar anúncios próprios.
RF10	Permitir desativar anúncios próprios.
RF11	Permitir reativar anúncios próprios, caso ainda estejam disponíveis.
RF12	Permitir visualizar os anúncios publicados pelo usuário.
RF13	Disponibilizar botão de contato via WhatsApp.
RF14	Ocultar anúncios desativados da listagem pública.

### 3. Requisitos não funcionais
Código	Requisito
RNF01	As senhas deverão ser armazenadas com hash utilizando bcrypt.
RNF02	O acesso às funcionalidades privadas deverá exigir autenticação.
RNF03	O sistema deverá utilizar PostgreSQL para persistência.
RNF04	A interface deverá ser responsiva.
RNF05	O sistema deverá validar os dados enviados pelo usuário.
RNF06	Um usuário não poderá editar ou desativar anúncios de terceiros.
RNF07	As imagens deverão ser armazenadas por meio de serviço de arquivos, mantendo suas referências no banco de dados.
RNF08	A comunicação com o back-end deverá ocorrer por meio de API.

### 4. Regras de negócio
Estas regras são especialmente importantes para o desenvolvimento do back-end.
1. Todo anúncio deverá pertencer a um usuário cadastrado.
2. Qualquer usuário autenticado poderá criar anúncios.
3. Um usuário poderá possuir vários anúncios.
4. Um anúncio poderá conter várias imagens.
5. Somente o proprietário poderá editar, ativar ou desativar seu anúncio.
6. Anúncios desativados não deverão aparecer nas pesquisas públicas.
7. O botão de WhatsApp deverá utilizar o número cadastrado pelo anunciante.
8. A desativação não deverá excluir os dados do anúncio do banco de dados.
9. Um anúncio poderá ser reativado pelo proprietário.
10. O sistema não será responsável por confirmar ou intermediar a adoção.
5. Estrutura inicial do banco de dados
Para esse projeto, recomendo começar com três tabelas principais. Isso evita complicações desnecessárias e mantém os relacionamentos organizados.

### USUARIOS

Armazena as informações das contas.
- id (PK)
- nome
- email (único)
- senha_hash
- whatsapp
- cidade
- estado
- criado_em


### ANIMAIS

Armazena os anúncios publicados.
- id (PK)
- usuario_id (FK)
- nome
- especie
- raca
- sexo
- idade
- porte
- descricao
- status
- criado_em
- atualizado_em


### IMAGENS_ANIMAIS

Armazena as referências das fotos de cada anúncio.
- id (PK)
- animal_id (FK)
- url_imagem
- criado_em


### Relacionamentos:
- Um usuário pode possuir vários anúncios.
- Um anúncio pertence a apenas um usuário.
- Um anúncio pode possuir várias imagens.
- Cada imagem pertence a um único anúncio.

### IMG

### 5. Tecnologias e arquitetura
A proposta técnica será:
Camada	Tecnologia
Front-end	HTML, CSS e JavaScript
Back-end	Node.js e Express
Banco de dados	PostgreSQL
Linguagem do banco	SQL (schema.sql)
Autenticação	JWT e bcrypt
Imagens	Serviço de armazenamento externo
Desenvolvimento	Visual Studio Code

O fluxo será:
### IMG
O armazenamento das imagens ficará separado do PostgreSQL: o banco guardará os endereços das fotos, enquanto os arquivos serão armazenados em um serviço próprio.

### 6. Rotas principais da API
Para organizar o back-end, podemos separar as rotas por responsabilidade.

| Método |         Rota            |           Função                  |
|--------|-------------------------|-----------------------------------|
| POST   |	/api/auth/register     |	Cadastrar usuário                |
|  POST  |	/api/auth/login	       |  Fazer login                      |
|  GET   |	/api/users/me	         |  Consultar conta autenticada      |
|  PUT   |	/api/users/me	         |  Editar conta                     | 
|  GET   |	/api/animals	         |  Listar anúncios disponíveis      |
|  GET   |	/api/animals/:id       |	Consultar detalhes de um animal  |
|  POST  |	/api/animals	         |  Publicar anúncio                 |
|  PUT   |	/api/animals/:id       |	Editar anúncio                   |
|  PATCH | /api/animals/:id/status |	Desativar ou reativar anúncio    |
|  GET   |	/api/users/me/animals	 |  Listar anúncios próprios         |

As rotas de publicação, edição e alteração de status deverão exigir autenticação.

### 7. O que não fará parte do projeto
Para evitar que o escopo cresça demais, vamos deixar de fora:
- Solicitações de adoção.
- Aprovação ou rejeição de interessados.
- Acompanhamento de processos de adoção.
- Chat interno.
- Sistema de mensagens.
- Pagamentos.
- Avaliações de usuários.
- Painel administrativo complexo.
O contato será feito diretamente pelo WhatsApp, fora da plataforma.
