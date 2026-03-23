🛍️ DonaKa Web

É uma aplicação web de e-commerce desenvolvida com HTML, CSS e JavaScript puro, consumindo dados da Fake Store API, com foco em responsividade, organização de código e experiência do usuário.

🚀 Funcionalidades

🔍 Listagem de produtos via API
📄 Página de detalhes com informações completas
❤️ Sistema de favoritos com persistência em LocalStorage
🔎 Busca por nome e categoria
🧩 Filtro por categorias
📬 Formulário com validação completa (nome, e-mail e mensagem)
⏳ Spinner de carregamento em requisições externas
📱 Layout responsivo usando Flexbox + Grid
🎨 Identidade visual personalizada (tema inspirado nas cores do Mercado Livre)

💻 Tecnologias utilizadas

📌HTML5
📌CSS3 (Flexbox, Grid, Media Queries)
📌JavaScript ES6+
👩‍💻LocalStorage
📌API REST — https://fakestoreapi.com/

📂 Estrutura do projeto
/assets
/img
/css
/js
main.js
details.js
favorites.js
form.js
index.html
details.html
favorites.html
contact.html
README.md

▶️ Como executar o projeto

Clone o repositório: git clone https://github.com/ChristianoMiguelSamorideAzevedo/DonaKa

💻Abra o projeto em um servidor local (ex: Live Server do VS Code).

🧩 Observações importantes

Os dados exibidos são fornecidos via Fake Store API.
Os valores originalmente em USD foram convertidos para BRL para melhorar a experiência do usuário.
Todo o código foi escrito em inglês, conforme exigência do desafio.

🧠 Aprendizados e Desafios:

🚧 Desafios Técnicos

1. Organização do CSS e Responsividade
   No começo, meu CSS estava crescendo sem uma estrutura clara, o que dificultou ajustes e manutenção.
   👨🏽‍💻Como resolvi:
   Reorganizei blocos por componentes
   Implementei responsividade desde o início
   Padronizei espaçamentos, largura e comportamento das seções

2. Manipulação da API e fluxo assíncrono
   Entender como consumir a API, tratar os dados e atualizar o DOM sem travar a interface exigiu atenção.
   👨🏽‍💻Como resolvi:
   Estruturei a função de fetch com try/catch/finally
   Criei um spinner global
   Separei responsabilidades em funções menores

3. Controle de favoritos com LocalStorage para garantir que o estado persistisse e sincronizasse entre páginas foi um aprendizado importante.
   👨🏽‍💻Como resolvi:
   Criei helpers dedicados (getFavorites, toggleFavorite, isFavorite)
   Tornei o módulo de favoritos reutilizável
   Evitei duplicação de código usando funções únicas

4. Detalhes de acessibilidade e UX
   O desafio pedia semântica e boa organização.
   👨🏽‍💻Como resolvi:
   Usei aria-label, aria-pressed, roles e dynamic updates
   Segui hierarquia de headings e semântica HTML5

🤩 Desafios Pessoais (com maturidade e profissionalismo):

Durante o desenvolvimento deste projeto, enfrentei um desafio significativo: estou hospitalizado desde quinta-feira, realizando sessões de quimioterapia.
A internet instável associado ao ambiente limitado e a necessidade de manter foco e consistência transformaram o processo em um exercício real e inesquecível de resiliência.
Mesmo com essas condições, mantive disciplina para concluir o projeto dentro do prazo estendido, sempre tentando entregar não apenas o mínimo, mas algo que me deixasse orgulhoso como Estudante e Profissional em Formação.

Essa experiência me ensinou algo valioso:
➡️ capacidade de adaptação é tão importante quanto o conhecimento técnico.

👩‍💻 O que aprendi com essa entrega:

🛍️Estruturar melhor projetos front‑end sem frameworks.
☺️Consumir e manipular APIs REST usando JavaScript puro.
🤩Organizar o DOM com funções coesas.
😎Criar componentes reutilizáveis.
👨🏽‍💻Trabalhar com LocalStorage de forma limpa.
💻Pensar mais em arquitetura e menos em “apenas fazer funcionar”.
🗒️A importância da documentação desde o início.

🔁 O que faria diferente numa próxima versão:

📍Começar pela documentação técnica e arquitetura.
📍Planejar o CSS com uma estrutura modular desde o primeiro commit.
📍Separar ainda mais os módulos JS (parcialmente aplicado aqui).
📍Testar a responsividade desde os primeiros componentes.
📍Criar funções utilitárias para evitar repetições.

🧭 Reflexão Final:

Este projeto não foi apenas uma "entrega técnica".
Foi uma oportunidade incrível de exercitar a persistência, foco e superação e agradecer a minha Esposa Karina Samori por tudo que aposta em mim em nossa luta para me manter vivo, útil e produtivo.
Mesmo em condições adversas, graças ao Suporte incansável de meu Tutor Ariel e das minhas SM Ana Clara e Coordenadora: Liliv, consegui aprender, evoluir e concluir o desafio com um certo orgulho.😎

## 👨‍💻 Autor

**Christiano Miguel Samori de Azevedo**  
Desenvolvedor Front-end em formação, apaixonado por tecnologia, aprendizado contínuo e impacto social.

### Contato

- 🌐 LinkedIn: https://www.linkedin.com/in/SEU-LINK-AQUI
- 📧 E-mail: miguelsamzevedo@gmail.com
