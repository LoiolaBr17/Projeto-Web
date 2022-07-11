# PROJETO : PET-SPA

Sistema de agendamento de seções de cuidados para pets em uma pet-shop, como por exemplo Tosa e Banho.

## Membros da equipe

 MATEUS GONÇALVES LOIOLA - 496797
 ODIMAR SOUSA FALCAO FILHO - 496581

## Tecnologias e frameworks utilizados

Vue : é um framework JavaScript de código-aberto, focado no desenvolvimento de interfaces de usuário e aplicativos de página única
CSS :  é um mecanismo para adicionar estilo a um documento Web.
HTML : é uma linguagem de marcação utilizada na construção de páginas na Web.

Strapi : Strapi é um sistema de gerenciamento de conteúdo (CMS ) e framework web desenvolvido como software de código aberto. 

## Papeis ou tipos de usuÃ¡rio do sistema

Adminstrador e Cliente, ambos os usuários são autenticados.

## Entidades, Tabelas ou Coleções utilizadas

Administrador, Cliente e Serviços

## Operações implementadas para cada entidade

| Entidade| Create | Read | Update | Delete |
| --- | --- | --- | --- | --- |
| Administrador | |  X  |   |  |
| Cliente | X |  X  |   |  |
| Serviço | X | X  |  | X |

## Rotas da API REST utilizadas


| Métodos HTTP | URL |
| --- | --- |
| GET | http://localhost:1337/api/users/me |
| GET | http://localhost:1337/api/pacotes |
| GET | http://localhost:1337/api/reserva-pets?filters[EmailDono][$eq]=${email} |
| GET | http://localhost:1337/api/reserva-pets |
| POST | http://localhost:1337/auth/local |
| POST | http://localhost:1337/api/users |
| PUT | Put  http://localhost:1337/api/reserva-pets/${id} |
| DELETE | hhttp://localhost:1337/api/reserva-pets/${id} |
| DELETE | http://localhost:1337/api/reserva-pets/${id} |


