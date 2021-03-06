<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJadwalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jadwals', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('ids');
            $table->string('alias');
            $table->date('tanggal');
            $table->time('mulai');
            $table->time('berakhir');
            $table->integer('lama');
            $table->string('token',50)->nullable();
            $table->char('status_ujian',1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jadwals');
    }
}
