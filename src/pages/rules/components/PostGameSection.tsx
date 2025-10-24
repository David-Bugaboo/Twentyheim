import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  PowerListTitle,
  ParchmentText,
} from "../../../components/PageComponents";

function PostGameSection() {
  return (
    <Box
      sx={{
        mt: 8,
        mb: 6,
        pt: 5,
        borderTop: "4px double #d4af37",
      }}
      id="a-campanha"
    >
      <PowerListTitle sx={{ fontSize: "2rem", mb: 4, textAlign: "center" }}>
        A Campanha
      </PowerListTitle>

      <Box
        sx={{
          mb: 5,
          p: 4,
          backgroundColor: "rgba(20, 18, 14, 0.6)",
          border: "3px solid #8b4513",
          borderRadius: "4px",
        }}
      >
        <ParchmentText
          sx={{
            fontStyle: "italic",
            fontSize: "1.1rem",
            textAlign: "center",
          }}
        >
          "Uma batalha é sobrevivência. Uma campanha é destino. Em Mordheim,
          cada jogo não é apenas luta — é história sendo escrita em sangue, ouro
          e Pedra-bruxa. Seu bando evolui, enfraquece, cresce ou morre. Esta é a
          verdadeira natureza de Mordheim: não uma única batalha, mas uma guerra
          sem fim contra a ruína, o tempo, e a própria maldição da cidade."
        </ParchmentText>
      </Box>

      <ParchmentText sx={{ mb: 4 }}>
        Mordheim não é travada em uma única tarde de sangue. É uma série de
        batalhas, cada uma deixando cicatrizes, cada uma forjando lendas ou
        criando cadáveres. Uma campanha é a crônica do seu bando — de seus
        primeiros passos hesitantes nas ruínas até sua glória eventual... ou
        extinção inevitável.
      </ParchmentText>

      {/* Fase de Campanha */}
      <Box sx={{ mt: 5, mb: 6 }}>
        <PowerListTitle sx={{ fontSize: "1.8rem", mb: 3 }}>
          Fase de Campanha
        </PowerListTitle>

        <ParchmentText sx={{ mb: 4 }}>
          A batalha acabou. Os mortos jazem onde caíram. Os sobreviventes
          arrastam-se de volta aos acampamentos improvisados, sangrando,
          exaustos, mas vivos. Agora vem a parte que muitos esquecem: a
          contabilidade da carnificina. Quem sobreviveu? Quem morreu? O que foi
          ganho? O que foi perdido? Esta é a{" "}
          <strong>Fase de Campanha</strong> — onde batalhas se tornam
          história, e história se torna lenda... ou esquecimento.
        </ParchmentText>

        <Box
          sx={{
            mb: 4,
            p: 3,
            backgroundColor: "rgba(139, 115, 85, 0.1)",
            borderRadius: "4px",
          }}
        >
          <ParchmentText sx={{ fontStyle: "italic", color: "#c4a870" }}>
            "Quando a fumaça se dissipa e o sangue seca, o verdadeiro trabalho
            começa. Contar os mortos. Dividir o saque. Preparar para a próxima
            vez. Porque em Mordheim, sempre há uma próxima vez."
          </ParchmentText>
        </Box>

        {/* 1. Ferimentos e Morte */}
        <Box sx={{ mb: 6 }} id="ferimentos-e-morte">
          <PowerListTitle sx={{ fontSize: "1.3rem", mb: 3 }}>
            1. Ferimentos e Morte
          </PowerListTitle>

          <ParchmentText sx={{ mb: 4 }}>
            Para cada modelo que foi reduzido a 0 de Vigor durante o jogo,
            existe a possibilidade de que aquele modelo sofra ferimentos
            permanentes ou morra. Em Mordheim, cair não significa
            necessariamente morte — às vezes significa algo pior.
          </ParchmentText>

          {/* Tabela de Soldados */}
          <Box
            sx={{
              mb: 4,
              p: 3,
              backgroundColor: "rgba(139, 115, 85, 0.1)",
              borderLeft: "4px solid #d4af37",
            }}
          >
            <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
              Sobrevivência de Soldados
            </PowerListTitle>

            <ParchmentText sx={{ mb: 3 }}>
              Para cada soldado que foi reduzido a 0 de Vigor, role um d20 e
              consulte a tabela abaixo:
            </ParchmentText>

            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        backgroundColor: "#8b7355",
                        color: "#d4af37",
                        fontWeight: "bold",
                      }}
                    >
                      Rolagem
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#8b7355",
                        color: "#d4af37",
                        fontWeight: "bold",
                      }}
                    >
                      Resultado
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1-10</TableCell>
                    <TableCell>Morte</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>11-15</TableCell>
                    <TableCell>Ferimento Permanente</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>16-20</TableCell>
                    <TableCell>Recuperação Completa</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <ParchmentText sx={{ mb: 2 }}>
              <strong>Morte:</strong> O soldado morreu. Remova-o permanentemente
              do seu bando. Em Mordheim, a morte é barata e comum.
            </ParchmentText>

            <ParchmentText sx={{ mb: 2 }}>
              <strong>Ferimento Permanente:</strong> O soldado sobreviveu, mas
              com sequelas. Role na tabela de ferimentos permanentes e aplique o
              resultado. Ele permanece no bando, mas pode ter suas capacidades
              reduzidas.
            </ParchmentText>

            <ParchmentText>
              <strong>Recuperação Completa:</strong> O soldado se recuperou
              completamente. Ele volta ao jogo na próxima batalha sem
              penalidades.
            </ParchmentText>
          </Box>

          {/* Tabela de Heróis e Campeões */}
          <Box
            sx={{
              mb: 4,
              p: 3,
              backgroundColor: "rgba(139, 115, 85, 0.1)",
              borderLeft: "4px solid #c4a870",
            }}
          >
            <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
              Sobrevivência de Heróis e Campeões
            </PowerListTitle>

            <ParchmentText sx={{ mb: 3 }}>
              Heróis e campeões são mais resistentes que soldados comuns. Para
              cada herói ou campeão que foi reduzido a 0 de Vigor, role um d20 e
              consulte a tabela abaixo:
            </ParchmentText>

            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        backgroundColor: "#8b7355",
                        color: "#d4af37",
                        fontWeight: "bold",
                      }}
                    >
                      Rolagem
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#8b7355",
                        color: "#d4af37",
                        fontWeight: "bold",
                      }}
                    >
                      Resultado
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1-5</TableCell>
                    <TableCell>Morte</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>6-15</TableCell>
                    <TableCell>Ferimento Permanente</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>16-20</TableCell>
                    <TableCell>Recuperação Completa</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <ParchmentText sx={{ mb: 2 }}>
              <strong>Morte:</strong> O herói ou campeão morreu. Esta é uma
              perda significativa para o bando. Você pode requisitar um novo
              herói seguindo as regras específicas.
            </ParchmentText>

            <ParchmentText sx={{ mb: 2 }}>
              <strong>Ferimento Permanente:</strong> O herói sobreviveu, mas com
              sequelas. Role na tabela de ferimentos permanentes e aplique o
              resultado. Ele permanece no bando, mas pode ter suas capacidades
              reduzidas.
            </ParchmentText>

            <ParchmentText>
              <strong>Recuperação Completa:</strong> O herói se recuperou
              completamente. Ele volta ao jogo na próxima batalha sem
              penalidades.
            </ParchmentText>
          </Box>

          {/* Tabela de Ferimentos Permanentes */}
          <Box
            sx={{
              mb: 4,
              p: 3,
              backgroundColor: "rgba(139, 115, 85, 0.1)",
              borderLeft: "4px solid #8b4513",
            }}
          >
            <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
              Registrando Ferimentos Permanentes
            </PowerListTitle>

            <ParchmentText sx={{ mb: 3 }}>
              Quando um modelo sofre um ferimento permanente, role um d20 e
              consulte a tabela abaixo:
            </ParchmentText>

            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        backgroundColor: "#8b7355",
                        color: "#d4af37",
                        fontWeight: "bold",
                      }}
                    >
                      Rolagem
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#8b7355",
                        color: "#d4af37",
                        fontWeight: "bold",
                      }}
                    >
                      Ferimento
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#8b7355",
                        color: "#d4af37",
                        fontWeight: "bold",
                      }}
                    >
                      Efeito
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1-2</TableCell>
                    <TableCell>Ferimento na Cabeça</TableCell>
                    <TableCell>-1 Vontade</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3-4</TableCell>
                    <TableCell>Ferimento no Braço</TableCell>
                    <TableCell>-1 Ímpeto</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>5-6</TableCell>
                    <TableCell>Ferimento na Perna</TableCell>
                    <TableCell>-1 Movimento</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>7-8</TableCell>
                    <TableCell>Ferimento no Tórax</TableCell>
                    <TableCell>-1 Vigor</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>9-10</TableCell>
                    <TableCell>Ferimento no Olho</TableCell>
                    <TableCell>-1 Precisão</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>11-20</TableCell>
                    <TableCell>Ferimento Menor</TableCell>
                    <TableCell>Nenhum efeito</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <ParchmentText>
              <strong>Nota:</strong> Ferimentos permanentes são cumulativos. Um
              modelo pode ter múltiplos ferimentos, cada um com seus próprios
              efeitos. Em Mordheim, a sobrevivência tem seu preço.
            </ParchmentText>
          </Box>
        </Box>

        {/* 2. Magias e Poderes Fora de Jogo */}
        <Box sx={{ mb: 6 }} id="magias-e-poderes-fora-de-jogo">
          <PowerListTitle sx={{ fontSize: "1.3rem", mb: 3 }}>
            2. Magias e Poderes Fora de Jogo
          </PowerListTitle>

          <ParchmentText sx={{ mb: 4 }}>
            Algumas magias e poderes têm efeitos que se estendem além da
            batalha. Estes efeitos são aplicados durante a Fase de
            Campanha-jogo, podendo afetar a recuperação, o crescimento, ou o
            destino do bando.
          </ParchmentText>

          <Box
            sx={{
              mb: 4,
              p: 3,
              backgroundColor: "rgba(139, 115, 85, 0.1)",
              borderLeft: "4px solid #d4af37",
            }}
          >
            <ParchmentText sx={{ mb: 2 }}>
              <strong>Magias de Cura:</strong> Magias que curam ferimentos podem
              ser usadas após a batalha para reduzir ou eliminar ferimentos
              permanentes sofridos pelos membros do bando.
            </ParchmentText>

            <ParchmentText sx={{ mb: 2 }}>
              <strong>Poderes de Proteção:</strong> Alguns poderes podem
              proteger o bando de certos efeitos negativos durante a sequência
              pós-jogo.
            </ParchmentText>

            <ParchmentText>
              <strong>Magias de Maldição:</strong> Magias malévolas podem ter
              efeitos duradouros que afetam o bando inimigo mesmo após a
              batalha.
            </ParchmentText>
          </Box>
        </Box>

        {/* 3. Enviar Líderes às Ruínas */}
        <Box sx={{ mb: 6 }} id="enviar-lideres-as-ruinas">
          <PowerListTitle sx={{ fontSize: "1.3rem", mb: 3 }}>
            3. Enviar Líderes às Ruínas
          </PowerListTitle>

          <ParchmentText sx={{ mb: 4 }}>
            Heróis e campeões podem ser enviados para explorar as ruínas de
            Mordheim em busca de tesouros, conhecimento, ou poder. Esta é uma
            atividade arriscada, mas potencialmente recompensadora.
          </ParchmentText>

          <Box
            sx={{
              mb: 4,
              p: 3,
              backgroundColor: "rgba(139, 115, 85, 0.1)",
              borderLeft: "4px solid #c4a870",
            }}
          >
            <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
              O Ritual da Exploração
            </PowerListTitle>

            <ParchmentText sx={{ mb: 2 }}>
              Para enviar um líder às ruínas, role um d20 e consulte a tabela de
              exploração. O resultado pode variar de descobertas valiosas a
              perigos mortais.
            </ParchmentText>

            <ParchmentText>
              <strong>Riscos:</strong> Explorar as ruínas é perigoso. O líder
              pode sofrer ferimentos, encontrar inimigos, ou até mesmo morrer.
              Mas os tesouros que podem ser encontrados valem o risco.
            </ParchmentText>
          </Box>
        </Box>

        {/* 4. Experiência e Nível */}
        <Box sx={{ mb: 6 }} id="experiencia-e-nivel">
          <PowerListTitle sx={{ fontSize: "1.3rem", mb: 3 }}>
            4. Experiência e Nível
          </PowerListTitle>

          <ParchmentText sx={{ mb: 4 }}>
            Após cada batalha, os membros do bando ganham experiência baseada em
            suas ações e sobrevivência. Esta experiência pode ser usada para
            melhorar suas habilidades e capacidades.
          </ParchmentText>

          <Box
            sx={{
              mb: 4,
              p: 3,
              backgroundColor: "rgba(139, 115, 85, 0.1)",
              borderLeft: "4px solid #8b4513",
            }}
          >
            <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
              Experiência de Heróis
            </PowerListTitle>

            <ParchmentText sx={{ mb: 2 }}>
              Heróis ganham experiência por:
            </ParchmentText>

            <ParchmentText sx={{ pl: 3, mb: 2 }}>
              • <strong>Sobreviver à batalha:</strong> +1 ponto
              <br />• <strong>Matar um inimigo:</strong> +1 ponto por inimigo
              <br />• <strong>Conjurar magias com sucesso:</strong> +1 ponto por
              magia
              <br />• <strong>Usar poderes com sucesso:</strong> +1 ponto por
              poder
              <br />• <strong>Pegar fragmentos de Pedra-bruxa:</strong> +2
              pontos
            </ParchmentText>

            <ParchmentText>
              <strong>Subir de Nível:</strong> Quando um herói acumula 10 pontos
              de experiência, ele sobe de nível e pode escolher um avanço da
              lista apropriada.
            </ParchmentText>
          </Box>

          <Box
            sx={{
              mb: 4,
              p: 3,
              backgroundColor: "rgba(139, 115, 85, 0.1)",
              borderLeft: "4px solid #8b4513",
            }}
          >
            <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
              Experiência de Campeões
            </PowerListTitle>

            <ParchmentText sx={{ mb: 2 }}>
              Campeões ganham experiência de forma similar aos heróis, mas com
              algumas diferenças:
            </ParchmentText>

            <ParchmentText sx={{ pl: 3, mb: 2 }}>
              • <strong>Sobreviver à batalha:</strong> +1 ponto
              <br />• <strong>Matar um inimigo:</strong> +1 ponto por inimigo
              <br />• <strong>Usar poderes com sucesso:</strong> +1 ponto por
              poder
              <br />• <strong>Liderar soldados em combate:</strong> +1 ponto
            </ParchmentText>

            <ParchmentText>
              <strong>Subir de Nível:</strong> Campeões precisam de 15 pontos de
              experiência para subir de nível, mas têm acesso a avanços mais
              poderosos.
            </ParchmentText>
          </Box>

          <Box
            sx={{
              mb: 4,
              p: 3,
              backgroundColor: "rgba(139, 115, 85, 0.1)",
              borderLeft: "4px solid #8b4513",
            }}
          >
            <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
              Experiência de Soldados
            </PowerListTitle>

            <ParchmentText sx={{ mb: 2 }}>
              Soldados ganham experiência mais lentamente:
            </ParchmentText>

            <ParchmentText sx={{ pl: 3, mb: 2 }}>
              • <strong>Sobreviver à batalha:</strong> +1 ponto
              <br />• <strong>Matar um inimigo:</strong> +1 ponto por inimigo
              <br />• <strong>Pegar fragmentos de Pedra-bruxa:</strong> +1 ponto
            </ParchmentText>

            <ParchmentText>
              <strong>Subir de Nível:</strong> Soldados precisam de 20 pontos de
              experiência para subir de nível, mas podem se tornar soldados
              veteranos com habilidades especiais.
            </ParchmentText>
          </Box>

          <Box
            sx={{
              mb: 4,
              p: 3,
              backgroundColor: "rgba(139, 115, 85, 0.1)",
              borderLeft: "4px solid #d4af37",
            }}
          >
            <PowerListTitle sx={{ fontSize: "1.3rem", mb: 3, mt: 0 }}>
              Subir de Nível — Forjado pela Ruína
            </PowerListTitle>

            <ParchmentText sx={{ mb: 3 }}>
              Quando um modelo sobe de nível, ele pode escolher um avanço da
              lista apropriada para seu tipo e nível. Cada avanço melhora as
              capacidades do modelo de forma permanente.
            </ParchmentText>

            <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2 }}>
              Opções de Avanço
            </PowerListTitle>

            <ParchmentText sx={{ pl: 3, mb: 2 }}>
              • <strong>Aumentar Atributo:</strong> +1 em qualquer atributo
              <br />• <strong>Nova Habilidade:</strong> Aprender uma habilidade
              especial
              <br />• <strong>Novo Poder:</strong> Aprender um poder único
              <br />• <strong>Nova Magia:</strong> Aprender uma magia adicional
              <br />• <strong>Resistência:</strong> +1 em testes de resistência
            </ParchmentText>

            <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
              Limites Raciais de Atributos
            </PowerListTitle>

            <ParchmentText sx={{ mb: 2 }}>
              Cada raça tem limites máximos para seus atributos. Estes limites
              não podem ser ultrapassados através de avanços:
            </ParchmentText>

            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        backgroundColor: "#8b7355",
                        color: "#d4af37",
                        fontWeight: "bold",
                      }}
                    >
                      Raça
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#8b7355",
                        color: "#d4af37",
                        fontWeight: "bold",
                      }}
                    >
                      Ímpeto Máx
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#8b7355",
                        color: "#d4af37",
                        fontWeight: "bold",
                      }}
                    >
                      Precisão Máx
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#8b7355",
                        color: "#d4af37",
                        fontWeight: "bold",
                      }}
                    >
                      Vigor Máx
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#8b7355",
                        color: "#d4af37",
                        fontWeight: "bold",
                      }}
                    >
                      Vontade Máx
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Humano</TableCell>
                    <TableCell>6</TableCell>
                    <TableCell>6</TableCell>
                    <TableCell>6</TableCell>
                    <TableCell>6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Elfo</TableCell>
                    <TableCell>7</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Anão</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>7</TableCell>
                    <TableCell>6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Orc</TableCell>
                    <TableCell>7</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>7</TableCell>
                    <TableCell>4</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        {/* 5. Vendendo Pedra-Bruxa */}
        <Box sx={{ mb: 6 }} id="vendendo-pedra-bruxa">
          <PowerListTitle sx={{ fontSize: "1.3rem", mb: 3 }}>
            5. Vendendo Pedra-Bruxa
          </PowerListTitle>

          <ParchmentText sx={{ mb: 4 }}>
            Os fragmentos de Pedra-bruxa coletados durante as batalhas podem ser
            vendidos por ouro. Quanto maior o fragmento, mais valioso ele é, mas
            também mais perigoso de carregar.
          </ParchmentText>

          <Box
            sx={{
              mb: 4,
              p: 3,
              backgroundColor: "rgba(139, 115, 85, 0.1)",
              borderLeft: "4px solid #c4a870",
            }}
          >
            <PowerListTitle sx={{ fontSize: "1.1rem", mb: 3, mt: 0 }}>
              Tabela de Venda de Pedra-Bruxa
            </PowerListTitle>

            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        backgroundColor: "#8b7355",
                        color: "#d4af37",
                        fontWeight: "bold",
                      }}
                    >
                      Tamanho do Fragmento
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#8b7355",
                        color: "#d4af37",
                        fontWeight: "bold",
                      }}
                    >
                      Valor em Ouro
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#8b7355",
                        color: "#d4af37",
                        fontWeight: "bold",
                      }}
                    >
                      Riscos
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Pequeno</TableCell>
                    <TableCell>10-20</TableCell>
                    <TableCell>Baixo</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Médio</TableCell>
                    <TableCell>30-50</TableCell>
                    <TableCell>Médio</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Grande</TableCell>
                    <TableCell>60-100</TableCell>
                    <TableCell>Alto</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Enorme</TableCell>
                    <TableCell>150-300</TableCell>
                    <TableCell>Extremo</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <ParchmentText sx={{ mb: 2 }}>
              <strong>Riscos da Venda:</strong> Vender Pedra-bruxa não é
              simples. Fragmentos maiores atraem atenção indesejada e podem
              causar problemas para o bando.
            </ParchmentText>

            <ParchmentText>
              <strong>Mercados:</strong> Diferentes mercados oferecem preços
              diferentes. Mercados legais pagam menos, mas são mais seguros.
              Mercados negros pagam mais, mas são mais perigosos.
            </ParchmentText>
          </Box>
        </Box>

        {/* 6. Gastar Tesouro */}
        <Box sx={{ mb: 6 }} id="gastar-tesouro">
          <PowerListTitle sx={{ fontSize: "1.3rem", mb: 3 }}>
            6. Gastar Tesouro
          </PowerListTitle>

          <ParchmentText sx={{ mb: 4 }}>
            O ouro ganho através da venda de Pedra-bruxa e outros tesouros pode
            ser usado para melhorar o bando. Comprar equipamentos, contratar
            novos membros, ou investir em melhorias para o acampamento.
          </ParchmentText>

          <Box
            sx={{
              mb: 4,
              p: 3,
              backgroundColor: "rgba(139, 115, 85, 0.1)",
              borderLeft: "4px solid #8b4513",
            }}
          >
            <PowerListTitle sx={{ fontSize: "1.1rem", mb: 3 }}>
              Opções de Gasto
            </PowerListTitle>

            <ParchmentText sx={{ pl: 3, mb: 2 }}>
              • <strong>Equipamentos:</strong> Comprar armas, armaduras e itens
              mágicos
              <br />• <strong>Contratações:</strong> Recrutar novos soldados ou
              especialistas
              <br />• <strong>Treinamento:</strong> Melhorar as habilidades dos
              membros existentes
              <br />• <strong>Acampamento:</strong> Melhorar as instalações do
              bando
              <br />• <strong>Informação:</strong> Comprar informações sobre
              inimigos ou tesouros
            </ParchmentText>

            <ParchmentText>
              <strong>Orçamento:</strong> Cada bando tem um orçamento limitado.
              Escolha sabiamente onde investir seus recursos, pois cada coroa
              conta em Mordheim.
            </ParchmentText>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PostGameSection;
