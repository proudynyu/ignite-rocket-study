import { Stack } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from "react-icons/ri";
import { NavLinks } from "./NavLinks";
import { NavSection } from "./NavSection";

export const SidebarNav = () => {
  return (
    <Stack spacing={12} align="flex-start">
      <NavSection title="GERAL">
        <NavLinks name="Dashboard" icon={RiDashboardLine} href="/dashboard" />
        <NavLinks name="Usuários" icon={RiContactsLine} href="/users" />
      </NavSection>

      <NavSection title="AUTOMAÇÃO">
        <NavLinks name="Formulários" icon={RiInputMethodLine} href="/forms" />
        <NavLinks name="Automação" icon={RiGitMergeLine} href="/automation" />
      </NavSection>
    </Stack>
  );
};
