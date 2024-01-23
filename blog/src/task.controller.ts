import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { IBlogUpdateParams } from './interfaces/task-update-params.interface';
import { IBlogSearchByUserResponse } from './interfaces/task-search-by-user-response.interface';
import { IBlogDeleteResponse} from './interfaces/task-delete-response.interface';
import { IBlogCreateResponse } from './interfaces/task-create-response.interface';
import { IBlogUpdateByIdResponse } from './interfaces/task-update-by-id-response.interface';
import { BlogService } from './services/task.service';
import { IBlog } from './interfaces/task.interface';

@Controller()
export class TaskController {
  constructor(private readonly taskService: BlogService) {}

  @MessagePattern('task_search_by_user_id')
  public async taskSearchByUserId(
    userId: string,
  ): Promise<IBlogSearchByUserResponse> {
    let result: IBlogSearchByUserResponse;

    if (userId) {
      const blogs = await this.taskService.getBlogsByOwnerId(userId);
      result = {
        status: HttpStatus.OK,
        message: 'task_search_by_user_id_success',
        blogs,
      };
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'task_search_by_user_id_bad_request',
        blogs: null,
      };
    }

    return result;
  }

  @MessagePattern('task_update_by_id')
  public async taskUpdateById(params: {
    task: IBlogUpdateParams;
    id: string;
    userId: string;
  }): Promise<IBlogUpdateByIdResponse> {
    let result: IBlogUpdateByIdResponse;
    if (params.id) {
      try {
        const task = await this.taskService.findBlogById(params.id);
        if (task) {
          if (task.ownerId.toString() === params.userId) {
            const updatedTask = Object.assign(task, params.task);
            await updatedTask.save();
            result = {
              status: HttpStatus.OK,
              message: 'task_update_by_id_success',
              blog: updatedTask,
              errors: null,
            };
          } else {
            result = {
              status: HttpStatus.FORBIDDEN,
              message: 'task_update_by_id_forbidden',
              blog: null,
              errors: null,
            };
          }
        } else {
          result = {
            status: HttpStatus.NOT_FOUND,
            message: 'task_update_by_id_not_found',
            blog: null,
            errors: null,
          };
        }
      } catch (e) {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'task_update_by_id_precondition_failed',
          blog: null,
          errors: e.errors,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'task_update_by_id_bad_request',
        blog: null,
        errors: null,
      };
    }

    return result;
  }

  @MessagePattern('task_create')
  public async taskCreate(taskBody: IBlog): Promise<IBlogCreateResponse> {
    let result: IBlogCreateResponse;

    if (taskBody) {
      try {

        const blog = await this.taskService.createBlog(taskBody);
        result = {
          status: HttpStatus.CREATED,
          message: 'task_create_success',
          blog,
          errors: null,
        };
      } catch (e) {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'task_create_precondition_failed',
          blog: null,
          errors: e.errors,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'task_create_bad_request',
        blog: null,
        errors: null,
      };
    }

    return result;
  }

  @MessagePattern('task_delete_by_id')
  public async taskDeleteForUser(params: {
    userId: string;
    id: string;
  }): Promise<IBlogDeleteResponse> {
    let result: IBlogDeleteResponse;

    if (params && params.userId && params.id) {
      try {
        const task = await this.taskService.findBlogById(params.id);

        if (task) {
          if (task.ownerId.toString() === params.userId) {
            await this.taskService.removeBlogById(params.id);
            result = {
              status: HttpStatus.OK,
              message: 'task_delete_by_id_success',
              errors: null,
            };
          } else {
            result = {
              status: HttpStatus.FORBIDDEN,
              message: 'task_delete_by_id_forbidden',
              errors: null,
            };
          }
        } else {
          result = {
            status: HttpStatus.NOT_FOUND,
            message: 'task_delete_by_id_not_found',
            errors: null,
          };
        }
      } catch (e) {
        result = {
          status: HttpStatus.FORBIDDEN,
          message: 'task_delete_by_id_forbidden',
          errors: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'task_delete_by_id_bad_request',
        errors: null,
      };
    }

    return result;
  }
}
