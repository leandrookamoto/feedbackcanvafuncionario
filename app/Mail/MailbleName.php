<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MailableName extends Mailable
{
    use Queueable, SerializesModels;

    private $dados;
    private $assunto;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($dados)
    {
        $this->dados = $dados;
        $this->assunto = $dados['assunto'] ?? 'Solicitação de feedback';
        // $this->from = $dados['from'] ?? 'naoresponda@globalhitss.com.br';
      
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: $this->assunto ?? 'Solicitação de feedback',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function build()
    {
        return $this->from($this->dados['from'],$this->dados['nomeChefe'])
                    ->subject($this->assunto)
                    ->view('mail.test-email')
                    ->with(['dados' => $this->dados]);
    }

    /**
     * Define o assunto do e-mail.
     *
     * @param string $assunto
     * @return $this
     */
    public function definirAssunto($assunto)
{
    $this->assunto = $assunto;
    return $this;
}
}
