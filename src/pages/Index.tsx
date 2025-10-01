import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, Shield, Database, BookOpen, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Gestão Completa de Alunos",
      description: "Cadastro, edição e consulta de informações de alunos de forma simples e eficiente.",
    },
    {
      icon: Shield,
      title: "Segurança e Autenticação",
      description: "Sistema robusto de login com criptografia de senhas e controle de acesso.",
    },
    {
      icon: Database,
      title: "Banco de Dados Estruturado",
      description: "Armazenamento seguro e organizado de todas as informações acadêmicas.",
    },
    {
      icon: BookOpen,
      title: "Controle de Status",
      description: "Acompanhe o status acadêmico: Ativo, Trancado, Formado ou Inativo.",
    },
    {
      icon: BarChart,
      title: "Relatórios e Filtros",
      description: "Busque e filtre informações com facilidade para análises detalhadas.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Alumni Guard</span>
          </div>
          <Button onClick={() => navigate("/auth")}>
            Acessar Sistema
          </Button>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
              <GraduationCap className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Sistema de Gestão de Alunos
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Uma plataforma completa e moderna para gerenciar o cadastro de alunos
              de forma eficiente, segura e organizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" onClick={() => navigate("/auth")}>
                Começar Agora
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/dashboard")}>
                Ver Dashboard Demo
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recursos Principais
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tudo o que você precisa para uma gestão acadêmica eficiente
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <Card className="bg-primary text-primary-foreground border-none">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pronto para começar?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Acesse o sistema e comece a gerenciar seus alunos agora mesmo.
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/auth")}
              >
                Acessar Sistema
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Alumni Guard - Sistema de Gestão de Alunos</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
