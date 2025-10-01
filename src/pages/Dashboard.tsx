import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Plus, Search, Edit, Trash2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type StudentStatus = "Ativo" | "Inativo" | "Trancado" | "Formado";

interface Student {
  id: string;
  nome_completo: string;
  email_institucional: string;
  matricula: string;
  data_nascimento: string;
  status: StudentStatus;
  data_criacao: string;
  ultimo_acesso: string | null;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  // Mock data - será substituído por dados reais do Supabase
  const [students] = useState<Student[]>([
    {
      id: "1",
      nome_completo: "Maria Silva Santos",
      email_institucional: "maria.silva@instituicao.edu",
      matricula: "2024001001",
      data_nascimento: "2000-05-15",
      status: "Ativo",
      data_criacao: "2024-01-15",
      ultimo_acesso: "2024-03-20",
    },
    {
      id: "2",
      nome_completo: "João Pedro Oliveira",
      email_institucional: "joao.pedro@instituicao.edu",
      matricula: "2024001002",
      data_nascimento: "1999-08-22",
      status: "Ativo",
      data_criacao: "2024-01-15",
      ultimo_acesso: "2024-03-19",
    },
    {
      id: "3",
      nome_completo: "Ana Carolina Souza",
      email_institucional: "ana.souza@instituicao.edu",
      matricula: "2023001015",
      data_nascimento: "2001-03-10",
      status: "Trancado",
      data_criacao: "2023-02-01",
      ultimo_acesso: "2024-02-10",
    },
  ]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
    navigate("/");
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Aluno removido",
      description: "O status do aluno foi alterado para Inativo.",
    });
  };

  const getStatusVariant = (status: StudentStatus): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "Ativo":
        return "default";
      case "Trancado":
        return "secondary";
      case "Formado":
        return "outline";
      case "Inativo":
        return "destructive";
      default:
        return "default";
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.nome_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.matricula.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Sistema de Gestão de Alunos</h1>
              <p className="text-sm text-muted-foreground">Painel Administrativo</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">Gestão de Alunos</CardTitle>
                <CardDescription>
                  Gerencie o cadastro de todos os alunos da instituição
                </CardDescription>
              </div>
              <Button onClick={() => toast({ title: "Em breve", description: "Funcionalidade de adicionar aluno em desenvolvimento" })}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Aluno
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou matrícula..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                  <SelectItem value="Trancado">Trancado</SelectItem>
                  <SelectItem value="Formado">Formado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Matrícula</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Último Acesso</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Nenhum aluno encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.nome_completo}</TableCell>
                        <TableCell>{student.matricula}</TableCell>
                        <TableCell>{student.email_institucional}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(student.status)}>
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {student.ultimo_acesso
                            ? new Date(student.ultimo_acesso).toLocaleDateString("pt-BR")
                            : "Nunca"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toast({ title: "Em breve", description: "Funcionalidade de edição em desenvolvimento" })}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(student.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
