import React, { useRef, FC } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Modal from "../Modal";
import Input from "../Input";

interface FoodProps {
  id: string;
  image: string;
  name: string;
  price: string;
  description: string;
  available: boolean;
}

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  editingFood: FoodProps;
  handleUpdateFood: (food: FoodProps) => Promise<void>;
}

export const ModalEditFood: FC<Props> = ({
  isOpen,
  setIsOpen,
  handleUpdateFood,
  editingFood,
}) => {
  const formRef = useRef(null);

  const handleSubmit = async (data: FoodProps) => {
    handleUpdateFood(data);
    setIsOpen(true);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form
        ref={formRef.current}
        onSubmit={handleSubmit}
        initialData={editingFood}
      >
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />
        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />
        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditFood;
