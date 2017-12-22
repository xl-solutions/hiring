class PhonesController < ApplicationController
  before_action :set_phone, only: [:show, :edit, :update, :destroy]

  # GET /phones
  # GET /phones.json
  def index

      phones = Phone.all
      @colors = phones.collect{|phone| phone.color}.uniq
      @plans = phones.collect{|phone| phone.plan}.uniq
      @manufacturers = phones.collect{|phone| phone.manufacturer}.uniq


    if params[:phones_filter].present?
      filter = filter_params

      @phones = Phone.where(nil) # creates an anonymous scope
      @phones = @phones.colors(filter[:colors].split(",")) if filter[:colors].present?
      @phones = @phones.plans(filter[:plans].split(",")) if filter[:plans].present?
      @phones = @phones.manufacturers(filter[:manufacturers].split(",")) if filter[:manufacturers].present?
      @phones = @phones.models(filter[:models]) if filter[:models].present?

    else
      @phones = phones
    end

  end

  # GET /phones/1
  # GET /phones/1.json
  def show
  end

  # GET /phones/new
  def new
    @phone = Phone.new
  end

  # GET /phones/1/edit
  def edit
  end

  # POST /phones
  # POST /phones.json
  def create
    @phone = Phone.new(phone_params)

    respond_to do |format|
      if @phone.save
        format.html { redirect_to @phone, notice: 'Telefone foi cadastrado com sucesso.' }
        format.json { render :show, status: :created, location: @phone }
      else
        format.html { render :new }
        format.json { render json: @phone.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /phones/1
  # PATCH/PUT /phones/1.json
  def update
    respond_to do |format|
      if @phone.update(phone_params)
        format.html { redirect_to @phone, notice: 'Telefone foi atualizado com sucesso.' }
        format.json { render :show, status: :ok, location: @phone }
      else
        format.html { render :edit }
        format.json { render json: @phone.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /phones/1
  # DELETE /phones/1.json
  def destroy
    @phone.destroy
    respond_to do |format|
      format.html { redirect_to phones_url, notice: 'Telefone foi apagado com sucesso .' }
      format.json { head :no_content }
    end
  end

  def importer

    notices_array = Phone.importer(params[:file])

    redirect_to phones_path, notice: notices_array

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_phone
      @phone = Phone.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def phone_params
      params.require(:phone).permit(:manufacturer, :model, :color, :plan, :quantity, :price)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def filter_params
      params.require(:phones_filter).permit(:models, :colors, :plans, :manufacturers)
    end
end
