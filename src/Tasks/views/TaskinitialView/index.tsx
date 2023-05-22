import { BaseLayout } from "../../../Common/views/BaseLayout/BaseLaout"
import { AddTaskForm } from "../../components/AddTaskForm"

export const TaskInitialView = () => {
    return <BaseLayout>
       <AddTaskForm />
    </BaseLayout>
}