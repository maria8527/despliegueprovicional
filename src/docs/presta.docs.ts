/**
 * @swagger
 * components:
 *   schemas:
 *       User_no_registered:
 *            type: object
 *            properties:
 *                full_name:
 *                     type: string
 *                     description: full name of user no registered
 *                email:
 *                     type: string
 *                     description: email of user no registered
 *                monto_prestar:
 *                     type: number
 *                     description: monto a prestar of user no registered
 *                plazo_meses:
 *                     type: string
 *                     description: plazo en meses of user no registered 
 *            required:
 *                - full_name
 *                - email 
 *                - monto_prestar
 *                - plazo_meses
 */
/**
 * 
 * @swagger
 * /mongo:
 *  get:
 *      security:
 *         - bearerAuth: []
 *      summary: Bring all users
 *      tags: [users no registered]
 *      responses:
 *          200:
 *              description: Brought all the users no registered
 *          500:
 *              description: Internal server error
 *              content:
 *                 application/json:
 *                  schema:
 *                     type: array
 *                     $ref: '#/components/schemas/User_no_registered'
 */
/**
 * 
 * @swagger
 * /score:
 *  get:
 *      security:
 *         - bearerAuth: []
 *      summary: Bring all scores
 *      tags: [scores]
 *      responses:
 *          200:
 *              description: Brought all the scores
 *          500:
 *              description: Internal server error
 */
/**
 * @swagger
 * /mongo:
 *  post: 
 *      security:
 *         - bearerAuth: []
 *      summary: Creates a new user not registered in the application
 *      tags: [metod post the user not registered]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/User_no_registered'
 *      responses:
 *          201:
 *              description: Successfully created a new user no registered
 *          500:
 *              description: Failed to create a new user no registered
 *          400:
 *              description: Bad request         
 */
/**
 * 
 * @swagger
 * /mongo/:id:
 *  put:
 *      security:
 *         - bearerAuth: []
 *      summary: Edit the user no registered
 *      tags: [update the user no registered]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: idenfication of the user no registered
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   $ref: '#/components/schemas/User_no_registered'
 *      responses:
 *          200:
 *              description: Successfully updated user no registered
 *          304:
 *              description: User no registered with id not updated
 *          400:
 *              description: Bad request
 * 
 */
/**
 * @swagger
 * /mongo/:id:
 *  delete:
 *      security:
 *         - bearerAuth: []
 *      summary: Delete a user no registered
 *      tags: [delete the user no registered]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: idenfication of the user no registered
 *      responses:
 *          202:
 *              description: Successfully removed user no registered
 *          400:
 *              description: Failed to remove user no registered
 *          404:
 *              description: User no registered with id does not exist
 */
// Postgres
/**
 * 
 * @swagger
 * components:
 *   schemas:
 *       Registration_postgres:
 *            type: object
 *            properties:
 *                nombre_completo:  
 *                     type: string
 *                     description: full name of registration
 *                fecha_nacimiento:
 *                     type: date
 *                     description: date of birth of registration
 *                numero_celular:
 *                     type: number
 *                     description: telephone number of registration
 *                tipo_documento:
 *                     type: string
 *                     description: type of document of registration
 *                n_documento:
 *                     type: number
 *                     description: number of document of registration
 *                profesion_u_oficio:
 *                     type: string
 *                     description: job or profession of registration
 *                direccion:
 *                     type: string
 *                     description: address of registration
 *                email:
 *                     type: string
 *                     description: email of registration 
 *                rol:
 *                     type: string
 *                     description: role of registration
 *                contrasena:
 *                     type: string
 *                     description: password of registration
 *            required:
 *                - nombre_completo
 *                - fecha_nacimiento
 *                - numero_celular
 *                - tipo_documento
 *                - N_documento
 *                - profesion_u_oficio
 *                - direccion
 *                - email
 *                - rol
 *                - contraseña
 * 
 */
/**
 * 
 * 
 * @swagger
 * /api/registro:
 *  get:
 *      security:
 *         - bearerAuth: []
 *      summary: Bring all registrations. Esto es en la base de datos de postgres
 *      tags: [registrations]
 *      responses:
 *          200:
 *              description: Brought all the registrations
 *          500:
 *              description: Internal server error
 *              content:
 *                 application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Registration_postgres'
 */
/**
 * 
 * @swagger
 * /api/registro/:id:
 *  get:
 *      security:
 *         - bearerAuth: []
 *      summary: Bring a registration by id
 *      tags: [registrations by id]
 *      responses:
 *          200:
 *              description: Brought all the registrations by id
 *          500:
 *              description: Internal server error
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: idenfication of the one registration  
 */
/**
 * 
 * @swagger
 * /api/registro:
 *  post: 
 *      security:
 *         - bearerAuth: []
 *      summary: Creates a new registration the users
 *      tags: [metod post the registrations] 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Registration_postgres'
 *      responses:
 *          200:
 *              description: Successfully created a new registration
 *          500:
 *              description: Internal server error         
 */
/**
 * 
 * @swagger
 * /api/registro/:id:
 *  put:
 *      security:
 *         - bearerAuth: []
 *      summary: Edit the registration
 *      tags: [update the registration]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: idenfication of the registration
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   $ref: '#/components/schemas/Registration_postgres'
 *      responses:
 *          200:
 *              description: Successfully updated registration
 *          500:
 *              description: Internal server error
 */
/**
 * @swagger
 * /api/registro/:id:
 *  delete:
 *      security:
 *         - bearerAuth: []
 *      summary: Delete a registration
 *      tags: [delete the registration]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: idenfication of the registration
 *      responses:
 *          200:
 *              description: Registration deleted successfully
 *          500:
 *              description: Internal server error
 */
/**
 * 
 * @swagger
 * components:
 *   schemas:
 *       Prestamo_postgres:
 *            type: object
 *            properties:
 *                nombre_completo:  
 *                     type: string
 *                     description: full name of registration
 *                monto_prestar:
 *                     type: number
 *                     description: amount to loan of registration
 *                plazo_en_meses:
 *                     type: string
 *                     description: time to loan of registration
 *                fecha_creacion:
 *                     type: date
 *                     description: date of creation of registration
 *                tasa_interes:
 *                     type: string
 *                     description: interest rate of registration  
 *                estado:
 *                     type: string
 *                     description: status of registration 
 *                id_registro:
 *                     type: number
 *                     description: id of registration 
 *            required:
 *                - nombre_completo
 *                - monto_prestar
 *                - plazo_en_meses
 *                - fecha_creacion
 *                - tasa_interes
 *                - estado
 *                - id_registro
 * 
 */
/**
 * 
 * @swagger
 * /api/prestamo:
 *  get:
 *      security:
 *         - bearerAuth: []
 *      summary: Bring all loans. Esto es en la base de datos de postgres
 *      tags: [prestamos]
 *      responses:
 *          200:
 *              description: Brought all the loans
 *          500:
 *              description: Internal server error
 *              content:
 *                 application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Prestamo_postgres'
 */
/**
 * 
 * @swagger
 * /api/prestamo/:id:
 *  get:
 *      security:
 *         - bearerAuth: []
 *      summary: Bring a loan by id
 *      tags: [loan by id]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: idenfication of the one loan
 *      responses:
 *          200:
 *              description: Brought all the loans by id
 *          500:
 *              description: Internal server error
 */
/**
 * 
 * @swagger
 * /api/prestamo:
 *  post: 
 *      security:
 *         - bearerAuth: []
 *      summary: Creates a new loan the users
 *      tags: [metod post the loans]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Prestamo_postgres'
 *      responses:
 *          200:
 *              description: Successfully created a new loan
 *          500:
 *              description: Internal server error         
 */
/**
 * 
 * @swagger
 * /api/prestamo/:id:
 *  put:
 *      security:
 *         - bearerAuth: []
 *      summary: Edit the loan
 *      tags: [update the loan]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: idenfication of the loan
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   $ref: '#/components/schemas/Prestamo_postgres'
 *      responses:
 *          200:
 *              description: Successfully updated loan
 *          500:
 *              description: Internal server error
 */
/**
 * @swagger
 * /api/prestamo/:id:
 *  delete:
 *      security:
 *         - bearerAuth: []
 *      summary: Delete a loan
 *      tags: [delete the loan]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: idenfication of the loan
 *      responses:
 *          200:
 *              description: loan deleted successfully
 *          500:
 *              description: Internal server error
*/
/**
 * 
 * @swagger
 * components:
 *   schemas:
 *       Pago_postgres:
 *            type: object
 *            properties:
 *                fecha_pago_cuotas:  
 *                     type: date
 *                     description: date of payment
 *                tiempo_pagar:
 *                     type: number
 *                     description: time of payment
 *                cuota_pagar:
 *                     type: number
 *                     description: amount of payment
 *                cuotas_faltantes:
 *                     type: number
 *                     description: amount of pending payments
 *                saldo_restante:
 *                     type: number
 *                     description: amount of pending payments
 *                id_prestamo:
 *                     type: number
 *                     description: id of loan
 *                id_registro:
 *                     type: number
 *                     description: id of registration
 *            required:
 *                - fecha_pago_cuota
 *                - tiempo_pago
 *                - cuota_pagar
 *                - cuotas_faltantes
 *                - saldo_restante
 *                - id_prestamo
 *                - id_registro
 * @swagger
 * /api/pago:
 *  get:
 *      security:
 *         - bearerAuth: []
 *      summary: Bring all payments. Esto es en la base de datos de postgres
 *      tags: [pagos]
 *      responses:
 *          200:
 *              description: Brought all the payments
 *          500:
 *              description: Internal server error
 *              content:
 *                 application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Pago_postgres'
 */
/**
 * 
 * @swagger
 * /api/pago/:id:
 *  get:
 *      security:
 *         - bearerAuth: []
 *      summary: Bring a payment by id
 *      tags: [Bring by id]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: idenfication of the one payment
 *      responses:
 *          200:
 *              description: Brought all the payments by id
 *          500:
 *              description: Internal server error
 */
/**
 * 
 * @swagger
 * /api/pago:
 *  post: 
 *      security:
 *         - bearerAuth: []
 *      summary: Creates a new payment the users
 *      tags: [metod post the payments]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Pago_postgres'
 *      responses:
 *          200:
 *              description: Successfully created a new payment
 *          500:
 *              description: Internal server error         
 */
/**
 * 
 * @swagger
 * /api/pago/:id:
 *  put:
 *      security:
 *         - bearerAuth: []
 *      summary: Edit the payment
 *      tags: [update the payment]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: idenfication of the payment
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   $ref: '#/components/schemas/Pago_postgres'
 *      responses:
 *          200:
 *              description: Successfully updated payment
 *          500:
 *              description: Internal server error
 */
/**
 * @swagger
 * /api/pago/:id:
 *  delete:
 *      security:
 *         - bearerAuth: []
 *      summary: Delete a payment
 *      tags: [delete the payment]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: idenfication of the payment
 *      responses:
 *          200:
 *              description: payment deleted successfully
 *          500:
 *              description: Internal server error
*/