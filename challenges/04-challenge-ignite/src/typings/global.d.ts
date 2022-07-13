
interface DashboardProps {}

interface HeaderProps {
  openModal: () => void;
}

interface Food {
  id: string
  available: boolean;
  name: string;
  image: string;
  description: string;
  price: string;
}

interface FoodProps {
  food: Food;
  handleEditFood: (food: Food) => void
  handleDelete: (id: string) => Promise<void>
}

interface EditingFood {
  id: string
}

interface ModalProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

interface ModalAddFoodProps {
  isOpen: boolean
  setIsOpen: () => void
  handleAddFood: (food: Food) => void
}

interface ModalEditFoodProps {
  isOpen: boolean
  setIsOpen: () => void
  handleUpdateFood: (food: Food) => void
  editingFood: EditingFood
}